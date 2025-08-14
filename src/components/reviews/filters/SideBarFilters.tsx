// src/components/filters/SidebarFilters.tsx
"use client";

type Item = { label: string; count: number; active?: boolean };

export default function SidebarFilters({
  title = "Filtro",
  items,
  onSelect,
}: {
  title?: string;
  items: Item[];
  onSelect?: (label: string) => void;
}) {
  return (
    <aside className="rounded-xl border border-border bg-card shadow-sm">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
      </div>

      <ul className="divide-y divide-border">
        {items.map((it) => (
          <li key={it.label}>
            <button
              onClick={() => onSelect?.(it.label)}
              className={[
                "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
                it.active ? "bg-[#F8F6F2]" : "hover:bg-[#F8F6F2]",
              ].join(" ")}
            >
              <span className={["text-sm", it.active ? "text-brown font-medium" : ""].join(" ")}>
                {it.label}
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-background bg-[#3C3C3C] rounded px-2 py-0.5">
                {String(it.count).padStart(2, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
