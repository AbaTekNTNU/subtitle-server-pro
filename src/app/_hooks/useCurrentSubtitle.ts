import { api } from "~/trpc/react";
import { useState } from "react";
import { Subtitle } from "~/server/api/routers/subs";

export default function useCurrentSubtitle(initialSubtitle?: Subtitle) {
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | undefined>(initialSubtitle);

  api.subs.onSubtitleChanged.useSubscription(undefined, {
    onData: (subtitle) => {
      setCurrentSubtitle(subtitle.data);
    },
  });

  return currentSubtitle;
}