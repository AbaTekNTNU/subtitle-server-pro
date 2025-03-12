"use client";

import useCurrentSubtitle from "~/app/_hooks/useCurrentSubtitle";
import type { Subtitle } from "~/server/api/routers/subs";

type Props = {
  initialSubtitle?: Subtitle;
};

export default function SubtitleView({ initialSubtitle }: Props) {
  const currentSubtitle = useCurrentSubtitle(initialSubtitle);

  if (!currentSubtitle) {
    return null;
  }

  return (
    <>
      <div className="text-stroke-black left-0 right-0 mt-auto flex h-screen w-full flex-col items-center justify-end bg-none p-2 text-center text-[52px] text-white">
        <p className="absolute bottom-0 left-0 right-0">
          {currentSubtitle.bottom}
        </p>
        <p className="absolute left-0 right-0 top-0">{currentSubtitle.top}</p>
        <p className="absolute bottom-1/2 left-0 translate-y-1/2">
          {currentSubtitle.left}
        </p>
        <p className="absolute bottom-1/2 right-0 translate-y-1/2">
          {currentSubtitle.right}
        </p>
      </div>
    </>
  );
}
