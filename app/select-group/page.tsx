// app/select-group/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Button } from "@/src/components/ui/button";

export default function SelectGroup() {
  const [groups] = useState<string[]>(["Group A", "Group B", "Group C"]);
  const [selected, setSelected] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("pendingUid")) {
      router.replace("/");
    }
  }, [router]);

  const handleSelect = (group: string) => setSelected(group);

  const handleSubmit = async () => {
    const uid = sessionStorage.getItem("pendingUid");
    if (!uid || !selected) return;
    setSubmitting(true);
    await updateDoc(doc(db, "users", uid), {
      group: selected,
      groupSelectedAt: new Date(),
    });
    sessionStorage.removeItem("pendingUid");
    sessionStorage.setItem("registrationFlow", "false");
    router.replace("/"); // Homepage will now redirect to Module Selection
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-semibold">Select Your Group</h1>
      <div className="grid grid-cols-1 gap-4">
        {groups.map((g) => (
          <Button
            key={g}
            variant={g === selected ? "default" : "outline"}
            onClick={() => handleSelect(g)}
            disabled={submitting}
          >
            {g}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!selected || submitting}
        className="mt-4"
      >
        {submitting ? "Saving..." : "Confirm Group"}
      </Button>
    </div>
  );
}
