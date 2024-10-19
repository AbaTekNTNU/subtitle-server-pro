"use client";

import type { AllSongs } from "~/app/control/page";
import { useState } from "react";
import SubtitleControl from "~/app/_components/SubtitleControl";

type Props = {
  allSongs: AllSongs;
};

export default function SongSelector({ allSongs }: Props) {
  const [selectedSong, setSelectedSong] = useState<number>();

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl">Select a Song</h3>
      {selectedSong === undefined ? (
        allSongs.map((song, i) => (
          <div
            key={song.id}
            className="flex flex-col items-center justify-center gap-4"
          >
            <button
              className="rounded-lg bg-gray-800 px-4 py-2 text-white"
              onClick={() => {
                setSelectedSong(i);
              }}
            >
              {song.title}
            </button>
          </div>
        ))
      ) : (
        <SubtitleControl subtitles={allSongs[selectedSong]!.subtitleLines} />
      )}
    </div>
  );
}
