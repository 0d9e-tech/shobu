import { number, string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../../server/db";
import { createId } from "~/utils/misc";
import { arrayToGame, createGame, validateMove, move, gameToArray } from "~/utils/gamelogic";

import EventEmitter from "events";
import { GameState } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import { Pos, Vec } from "~/types";

const getGame = async (slug: string) => await db.gameSession.findFirst({
  where: {
      slug,
  },
});

export type MessageType<T extends string> = {
  type: T;
  /** game slug as stored in the database, use undefined for all games */
  slug?: string | undefined;
  /** cuid as stored in the database, use undefined for all players in the game */
  receiver?: string | undefined;
};

export type GameUpdatedMessage = MessageType<'GameUpdated'> & {
  board: number[],
  state: GameState,
  // TODO: game moves history
};

export type RenewGameMessage = MessageType<'RenewGame'> & {
  newSlug: string,
};

export type GameMessage = RenewGameMessage | GameUpdatedMessage;

const zodPos = z.object({ x: z.number(), y: z.number(), z: z.number() });
const zodVec = z.object({ x: z.number(), y: z.number() });

const ee = new EventEmitter();
const sendEvent = (data: GameMessage) => ee.emit('add', data);

export const gameRouter = createTRPCRouter({
  createGame: publicProcedure.mutation(async ({ ctx }) => {
    const gameId = createId(5);

    return await db.gameSession.create({
      data: {
        slug: gameId,
        state: "inviting",
        board: createGame(),
      },
    });
  }),
  
  registerPlayer: publicProcedure
    .input(z.object({ slug: z.string(), playerId: z.string() }))
    .mutation(async ({ ctx, input }) => {{
      const game = await getGame(input.slug);
      if (!game) return null;

      if (input.playerId == game.player1)
        return { role: 'player1' as const};

      if (input.playerId == game.player2)
        return { role: 'player2' as const};

      if (!game.player1) {
        await db.gameSession.update({
            where: {
                id: game.id,
            },
            data: {
                player1: input.playerId,
            },
        });

        return { role: 'player1' as const};
      }
      
      if (!game.player2) {
        await db.gameSession.update({
            where: {
                id: game.id,
            },
            data: {
                player2: input.playerId,
                state: 'player1plays'
            },
        });

        sendEvent({
            type: 'GameUpdated',
            slug: game.slug,
            board: game.board,
            state: 'player1plays',

        });

        return { role: 'player2' as const };
      } 

      return { role: 'spectator' as const }; 
    }}),

  submitMove: publicProcedure
    .input(z.object({ slug: z.string(), playerId: z.string(), passive: zodPos, active: zodPos, vec: zodVec }))
    .mutation(async ({ ctx, input }) => {
      const game = await getGame(input.slug);
      if (!game) return false;

      let player = 0;
      if (input.playerId == game.player1 && game.state == "player1plays")
        player = 1;
      else if (input.playerId == game.player2 && game.state == "player2plays")
        player = 2;

      // this user is a spectator or it is not their turn 
      if (player == 0)
        return false;

      const board = arrayToGame(game.board);

      if (validateMove(board, player, input.passive, input.active, input.vec)) {
        const newBoard = gameToArray(move(board, player, input.passive, input.active, input.vec));

        await db.gameSession.update({
          where: {
            slug: input.slug,
          },
          data: {
            board: newBoard,
          }
        });

        // TODO: check for a win

        sendEvent({
          type: 'GameUpdated',
          slug: game.slug,
          board: newBoard,
          state: player == 1 ? 'player2plays' : 'player1plays',
        });

        return true
      } else
        return false;
    }),

  gameData: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const game = await getGame(input.slug);
      if (!game) return;

      return {
        board: game.board,
        state: game.state,
      }
    }),

  gameDataSubscription: publicProcedure
    .input(z.object({ slug: z.string() }))
    .subscription(async ({ ctx, input }) => {
      return observable<GameMessage>((emit) => {
        const onNewEvent = (event: GameMessage) => {
            if (event.slug && event.slug !== input.slug)
                return;

            emit.next(event);
        }

        ee.on('add', onNewEvent);

        return () => {
            ee.off('add', onNewEvent);
        };
    });
    })
});
