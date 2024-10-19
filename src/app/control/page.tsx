import { api, HydrateClient } from "~/trpc/server";
import SongSelector from "~/app/_components/SongSelector";

export type AllSongs = Awaited<ReturnType<typeof api.songs.getAll>>;

export default async function Control() {
  const allSongs = await api.songs.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {/*<Preview />*/}
        <SongSelector allSongs={allSongs} />
      </main>
    </HydrateClient>
  );
}
