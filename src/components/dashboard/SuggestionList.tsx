"use client";

import React from "react";
import { Button } from "../ui/button";

const suggestions = [
  "Explain this concept",
  "Give an example",
  "Break down steps",
  "Compare with ...",
  "Show code snippet",
];

export function SuggestionList({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <div className="p-2 border-t bg-gray-50 dark:bg-gray-800 flex space-x-2 overflow-x-auto">
      {suggestions.map((s) => (
        <Button
          key={s}
          variant="outline"
          onClick={() => onSelect(s)}
          className="whitespace-nowrap"
        >
          {s}
        </Button>
      ))}
    </div>
  );
}
