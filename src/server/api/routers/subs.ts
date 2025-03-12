import EventEmitter, { on } from "events";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { tracked } from "@trpc/server";

export const subtitleSchema = z.object({
  top: z.string().optional().nullable(),
  bottom: z.string().optional().nullable(),
  left: z.string().optional().nullable(),
  right: z.string().optional().nullable(),
});
export type Subtitle = z.infer<typeof subtitleSchema>;

// create a global event emitter (could be replaced by redis, etc.)
export const currentSubEmitter = new EventEmitter<{ set: Subtitle[] }>();

export const subsRouter = createTRPCRouter({
  getCurrentSubtitle: publicProcedure.query(async () => {
    return {
      bottom: "",
    };
  }),

  onSubtitleChanged: publicProcedure.subscription(async function* () {
    // listen for new events
    let i = 0;
    for await (const [data] of on(currentSubEmitter, "set")) {
      const subtitle = data as Subtitle;
      i++;
      yield tracked(
        `${subtitle.top}-${subtitle.bottom}-${subtitle.left}-${subtitle.right}-${i}`,
        subtitle,
      );
    }
  }),

  setActiveSubtitle: publicProcedure
    .input(subtitleSchema)
    .mutation(async ({ input }) => {
      currentSubEmitter.emit("set", input);
    }),
});
