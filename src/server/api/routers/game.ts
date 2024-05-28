import { string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../../server/db";
import { createId } from "~/utils/misc";
import { createGame } from "~/utils/gamelogic";

export const gameRouter = createTRPCRouter({
    createGame: publicProcedure
        .mutation(async ({ ctx }) => {
            const gameId = createId(5);

            return await db.gameSession.create({
                data: {
                    slug: gameId,
                    state: "inviting",
                    board: createGame(),
                }
            });
        }),

    submitMove: publicProcedure
        .input(z.object({ player: z.string(), move: z.number() }))
        .mutation(async ({ ctx, input }) => {
            // neco
            
        }),

    getGameData: publicProcedure
        .input(z.object({ slug: z.string( )}))
        .query(async ({ ctx, input }) => {
            const game = await db.gameSession.findFirst({
                where: {
                    slug: input.slug
                }
            });

            if (!game)
                return null;

            return {
                board: game.board,
                state: game.state,
            }
        })

})