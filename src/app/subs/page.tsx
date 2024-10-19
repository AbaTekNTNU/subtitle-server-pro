import { api, HydrateClient } from "~/trpc/server";
import SubtitleView from "~/app/_components/subtitleView";

export default async function Subs() {
  const initialSubtitle = await api.subs.getCurrentSubtitle();

  return (
    <HydrateClient>
      <main className="flex min-h-screen bg-black text-white">
        <SubtitleView initialSubtitle={initialSubtitle} />
      </main>
    </HydrateClient>
  );
}
