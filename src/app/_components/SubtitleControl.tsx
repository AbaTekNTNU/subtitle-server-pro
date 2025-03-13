"use client";

import { api } from "~/trpc/react";
import { useCallback, useEffect, useState } from "react";
import { Subtitle } from "~/server/api/routers/subs";

type Props = {
  subtitles: Subtitle[];
};

export default function SubtitleControl({ subtitles }: Props) {
  const setActiveSubtitle = api.subs.setActiveSubtitle.useMutation();
  const [currentLine, setCurrentLine] = useState<number>();

  const setLine = useCallback(
    (line: number) => {
      if (line < 0 || line >= subtitles.length) {
        setCurrentLine(undefined);
        setActiveSubtitle.mutate({});
        return;
      }
      setCurrentLine(line);
      const subtitle = subtitles[line];
      const element = document.getElementById(`subtitle-${line + 5}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (subtitle) setActiveSubtitle.mutate(subtitle);
    },
    [setActiveSubtitle, subtitles],
  );

  useEffect(() => {
    // add event listener for keydown
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      e.preventDefault();
      if (e.key === "ArrowUp" || e.key === "k") {
        setLine(currentLine !== undefined ? currentLine - 1 : 0);
      } else if (e.key === "ArrowDown" || e.key === "j" || e.key === "Space") {
        setLine(currentLine !== undefined ? currentLine + 1 : 0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLine, setLine]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold tracking-tight">
        Subtitle Control
      </h2>
      {subtitles.map((subtitle, i) => (
        <div
          key={i}
          id={`subtitle-${i}`}
          className={i === currentLine ? "text-2xl font-bold" : ""}
          onClick={() => {
            setLine(i);
          }}
        >
          {subtitle.bottom}
          <span>
            {subtitle.top} - {subtitle.left} - {subtitle.right}
          </span>
        </div>
      ))}
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
