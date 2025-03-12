import { HydrateClient } from "~/trpc/server";
import Link from "next/link";
import SongEditor from "~/app/_components/SongEditor";
import { api } from "~/trpc/server";

export default async function EditSong({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const allSongs = await api.songs.getAll();
  const thisSong = allSongs.find((song) => song.id === id);

  if (!thisSong) {
    throw new Error("Song not found");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex max-w-2xl flex-col justify-center gap-12 px-4 py-16">
          <Link href="/songs">Back to Songs</Link>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Edit Song: {thisSong.title}
          </h1>
          <SongEditor
            id={id}
            title={thisSong.title}
            subtitleLines={thisSong.subtitleLines.reduce(
              (acc, { bottom, top, left, right }) =>
                acc +
                [bottom, top, left, right].filter(Boolean).join("::") +
                "\n",
              "",
            )}
          />
        </div>
      </main>
    </HydrateClient>
  );
}
