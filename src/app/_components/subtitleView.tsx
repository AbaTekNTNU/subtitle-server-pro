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
    <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center p-2">
      {currentSubtitle.bottom}
    </div>
  );
}