"use client";

import { useEffect, useState } from "react";
import CustomCheckbox from "../ui/CustomCheckbox";

type Item = { label: string; count: number; checked: boolean };

export default function SidebarChecklist({
  title = "Categorías",
  items,
  onToggle,
  onClear,
}: {
  title?: string;
  items: Item[];
  onToggle: (label: string) => void;
  onClear?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border !bg-[var(--primary)] text-white flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
          {onClear && <span className="h-3 w-10 bg-white/30 rounded" />}
        </div>
        <ul className="p-2 space-y-2">
          {[0, 1, 2].map(i => (
            <li key={i} className="py-2">
              <div className="h-4 w-52 bg-[#ECE6DC] rounded" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border !bg-[var(--primary)] text-white flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
        {onClear && items.some(it => it.checked) && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-white/90 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.label}>
            <label
              className="flex items-center justify-between px-4 py-2 cursor-pointer
                         hover:bg-[#F8F6F2] transition-colors rounded-md"
            >
              <span className={it.checked ? "text-brown font-medium text-sm" : "text-sm"}>
                {it.label}
              </span>
              <CustomCheckbox
                checked={it.checked}
                onChange={() => onToggle(it.label)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
