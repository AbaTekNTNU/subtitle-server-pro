import SubtitleView from "~/app/_components/subtitleView";
import { api } from "~/trpc/server";

export default async function Preview() {
  const initialSubtitle = await api.subs.getCurrentSubtitle();

  return (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight">Preview</h2>
      <div className="relative aspect-video h-[18rem] bg-black">
        <SubtitleView initialSubtitle={initialSubtitle} />
      </div>
    </div>
  );
}
