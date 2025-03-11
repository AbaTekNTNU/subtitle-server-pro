"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id?: number;
  title?: string;
  subtitleLines?: string;
};

export default function SongEditor(props: Props) {
  const addSong = api.songs.add.useMutation();
  const editSong = api.songs.edit.useMutation();
  const router = useRouter();

  const [title, setTitle] = useState(props.title ?? "");
  const [subtitleLines, setSubtitleLines] = useState(props.subtitleLines ?? "");

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl">Title</h3>
      <input
        className="text-black"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3 className="text-2xl">Subtitle Lines</h3>
      <p>
        bottom::top::left::right separated by semicolon to change display
        position
      </p>
      <textarea
        className="h-80 text-black"
        value={subtitleLines}
        onChange={(e) => setSubtitleLines(e.target.value)}
      />
      <br />
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() =>
          props.id
            ? editSong
                .mutateAsync({
                  id: props.id,
                  title,
                  subtitleLines: subtitleLines
                    .split(/\n/)
                    .map((line) => line.split("::"))
                    .map(([bottom, top, left, right]) => ({
                      bottom: bottom?.trim(),
                      top: top?.trim(),
                      left: left?.trim(),
                      right: right?.trim(),
                    })),
                })
                .then(() => router.push("/songs"))
            : addSong
                .mutateAsync({
                  title,
                  subtitleLines: subtitleLines
                    .split(/\n/)
                    .map((line) => line.split("::"))
                    .map(([bottom, top, left, right]) => ({
                      bottom: bottom?.trim(),
                      top: top?.trim(),
                      left: left?.trim(),
                      right: right?.trim(),
                    })),
                })
                .then(() => router.push("/songs"))
        }
      >
        {props.id !== undefined ? "Edit Song" : "Add Song"}
      </button>
    </div>
  );
}
