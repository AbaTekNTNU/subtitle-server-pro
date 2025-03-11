import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";

export default async function Songs() {
  const allSongs = await api.songs.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Link href="/">Back to Home</Link>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Existing Songs
          </h1>
          {allSongs.map((song) => (
            <a
              key={song.id}
              className="flex flex-col items-center justify-center gap-4"
              href={`/songs/${song.id}`}
            >
              <h2 className="text-3xl font-extrabold tracking-tight">
                {song.title}
              </h2>
            </a>
          ))}
          <Link href="/songs/add">Add Song</Link>
        </div>
      </main>
    </HydrateClient>
  );
}
