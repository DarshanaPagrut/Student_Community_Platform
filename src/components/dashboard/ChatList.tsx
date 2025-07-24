"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { cn } from "@/src/lib/utils";
import { MessageCircle, Clock, Trash2, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface ChatMeta {
  id: string;
  created: number;
  count: number;
  lastText: string;
}

export function ChatList({
  onSelect,
  onNew,
  onDelete,
  activeChatId,
}: {
  onSelect: (chatId: string | null) => void;
  onNew: () => void;
  onDelete: (chatId: string) => void;
  activeChatId: string | null;
}) {
  const [chats, setChats] = useState<ChatMeta[]>([]);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "chats"), orderBy("created", "desc"));
      const snap = await getDocs(q);
      const list: ChatMeta[] = [];
      for (const chatDoc of snap.docs) {
        const id = chatDoc.id;
        const created = (chatDoc.data().created as any).toMillis();
        const msgsSnap = await getDocs(
          query(
            collection(db, "chats", id, "messages"),
            orderBy("timestamp", "asc")
          )
        );
        const msgs = msgsSnap.docs.map((d) => d.data() as any);
        list.push({
          id,
          created,
          count: msgs.length,
          lastText: msgs.length ? msgs[msgs.length - 1].text : "No messages yet",
        });
      }
      setChats(list);
    }
    load();
  }, []);

  const formatRel = (ms: number) => {
    const diff = Date.now() - ms;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m} min ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} hr${h > 1 ? "s" : ""} ago`;
    const d = Math.floor(h / 24);
    return `${d} day${d > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="space-y-2">
      <Button variant="default" size="default" onClick={onNew} className="w-full justify-start">
        <Plus className="mr-2 h-4 w-4" /> New Chat
      </Button>

      {chats.map((c) => {
        const isActive = c.id === activeChatId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "w-full text-left rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              {
                // map your Button variants to card background/text
                "bg-[#1F2937] text-white hover:bg-gray-800": isActive,
                "bg-[#111827]  text-gray-100 hover:bg-gray-800": !isActive,
              },
              "p-3"
            )}
          >
            <p className={cn("truncate", { "font-semibold": isActive })}>
              {c.lastText}
            </p>
            <div className="mt-1 flex items-center text-xs">
              <MessageCircle className="mr-1 h-3 w-3" />
              <span className="mr-2">{c.count}</span>
              <Clock className="mr-1 h-3 w-3" />
              <span>{formatRel(c.created)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(c.id);
              }}
              className="absolute top-2 right-2 p-1"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </button>
        );
      })}
    </div>
  );
}
