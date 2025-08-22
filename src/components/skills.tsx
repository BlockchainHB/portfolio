"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

type SkillGroups = {
  aiTools?: string[];
  programming?: string[];
  design?: string[];
  ops?: string[];
};

type TabKey = keyof SkillGroups;

const TAB_LABELS: Record<TabKey, string> = {
  aiTools: "AI Tools",
  programming: "Programming",
  design: "Design",
  ops: "Ops & Growth",
};

export function SkillsSection({
  skills,
  maxVisible = 8,
}: {
  skills: SkillGroups;
  maxVisible?: number;
}) {
  const tabs = (Object.keys(TAB_LABELS) as TabKey[]).filter(
    (k) => (skills as any)[k]?.length,
  );
  const [active, setActive] = React.useState<TabKey>(tabs[0] ?? "programming");

  const activeList = (skills as any)[active] as string[] | undefined;
  const visible = activeList?.slice(0, maxVisible) ?? [];
  const overflow = Math.max((activeList?.length ?? 0) - visible.length, 0);

  return (
    <div className="w-full">
      <div className="inline-flex rounded-lg border bg-background p-1 text-xs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "px-3 py-1.5 rounded-md transition-colors",
              active === tab
                ? "bg-foreground text-background"
                : "hover:bg-muted text-foreground",
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {visible.map((skill) => (
          <span key={skill} className="inline-flex items-center rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-600">{skill}</span>
        ))}
        {overflow > 0 && (
          <span className="inline-flex items-center rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-600">+{overflow} more</span>
        )}
      </div>
    </div>
  );
}


