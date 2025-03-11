import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { subtitleSchema } from "~/server/api/routers/subs";

export const songsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.song.findMany({
        include: {
          subtitleLines: true,
        },
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw new Error("Failed to fetch songs");
    }
  }),

  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        subtitleLines: z.array(subtitleSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.song.create({
          data: {
            ...input,
            subtitleLines: {
              create: input.subtitleLines,
            },
          },
        });
      } catch (error) {
        console.error("Error adding song:", error);
        throw new Error("Failed to add song");
      }
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        subtitleLines: z.array(subtitleSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.song.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
            subtitleLines: {
              deleteMany: {},
              create: input.subtitleLines,
            },
          },
        });
      } catch (error) {
        console.error("Error editing song:", error);
        throw new Error("Failed to edit song");
      }
    }),
});
