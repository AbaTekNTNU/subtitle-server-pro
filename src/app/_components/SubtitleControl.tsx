"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function SubtitleControl() {
  const setActiveSubtitle = api.subs.setActiveSubtitle.useMutation();
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold tracking-tight">
        Subtitle Control
      </h2>
      <div className="flex items-center justify-center">
        <input
          className="text-black"
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button
          className="rounded-lg bg-gray-800 px-4 py-2 text-white"
          onClick={() => setActiveSubtitle.mutate({ bottom: textValue })}
        >
          Set
        </button>
      </div>
    </div>
  );
}
