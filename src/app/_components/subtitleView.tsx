"use client"

import useCurrentSubtitle from "~/app/_hooks/useCurrentSubtitle";
import type { Subtitle } from "~/server/api/routers/subs";

type Props = {
  initialSubtitle?: Subtitle ;
}

export default function SubtitleView({ initialSubtitle }: Props) {
  const currentSubtitle = useCurrentSubtitle(initialSubtitle);

  if (!currentSubtitle) {
    return null;
  }

  return (
    <div className="flex flex-col text-stroke-black w-full items-center justify-end h-screen mt-auto left-0 right-0 bg-none text-white text-center text-[52px] p-2">
      {currentSubtitle.bottom}
    </div>
  );
}
