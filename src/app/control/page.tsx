import { HydrateClient } from "~/trpc/server";
import Preview from "~/app/_components/preview";
import SubtitleControl from "~/app/_components/SubtitleControl";

export default async function Control() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Preview />
        <SubtitleControl />
      </main>
    </HydrateClient>
  );
}
