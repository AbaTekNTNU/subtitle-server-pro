"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import { Subtitle } from "~/server/api/routers/subs";

type Props = {
  subtitles: Subtitle[];
};

export default function SubtitleControl({ subtitles }: Props) {
  const setActiveSubtitle = api.subs.setActiveSubtitle.useMutation();
  const [currentLine, setCurrentLine] = useState<number>();
  const currentSubtitle =
    currentLine !== undefined ? subtitles[currentLine] : undefined;

  const setLine = (line: number) => {
    if (line < 0 || line >= subtitles.length) {
      setCurrentLine(undefined);
      setActiveSubtitle.mutate({});
      return;
    }
    setCurrentLine(line);
    const subtitle = subtitles[line];
    if (subtitle) setActiveSubtitle.mutate(subtitle);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold tracking-tight">
        Subtitle Control
      </h2>
      <span className="text-2xl font-bold tracking-tight">
        {currentSubtitle?.bottom}
      </span>
      <div className="flex items-center justify-center">
        <button
          disabled={currentLine === undefined}
          className="rounded-lg bg-gray-800 px-4 py-2 text-white disabled:opacity-50"
          onClick={() => {
            setLine(currentLine !== undefined ? currentLine - 1 : 0);
          }}
        >
          Previous
        </button>
        <button
          className="rounded-lg bg-gray-800 px-4 py-2 text-white"
          onClick={() => {
            setLine(currentLine !== undefined ? currentLine + 1 : 0);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
