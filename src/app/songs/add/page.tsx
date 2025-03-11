import { HydrateClient } from "~/trpc/server";
import Link from "next/link";
import SongEditor from "~/app/_components/SongEditor";

export default async function AddSong() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex max-w-2xl flex-col justify-center gap-12 px-4 py-16">
          <Link href="/songs">Back to Songs</Link>
          <h1 className="text-4xl font-extrabold tracking-tight">Add Song</h1>
          <SongEditor />
        </div>
      </main>
    </HydrateClient>
  );
}
