import { string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import Sqids from "sqids";
import { env } from "~/env";

const squid = new Sqids({
    minLength: 5,
    alphabet: env.SQUIDS_ALPHABET,
})

export const gameRouter = createTRPCRouter({
    submitMove: publicProcedure
        .input(z.object({ player: z.string(), move: z.number() }))
        .mutation(async ({ ctx, input }) => {
            // neco
            
    }),

    getGameData: publicProcedure
        .input(z.object({ slug: z.string( )}))
        .query(async ({ ctx, input }) => {
            const game = await ctx.db.gameSession.findFirst({
                where: {
                    id: squid.decode(input.slug)[0],
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