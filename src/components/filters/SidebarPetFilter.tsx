"use client";

import { useEffect, useState } from "react";

type PetFilter = true | false | null; // Sí / No / Todos

export default function SidebarPetFilter({
  title = "PetFriendly",
  value,
  onChange,
}: {
  title?: string;
  value: PetFilter;
  onChange: (v: PetFilter) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm h-[92px]" />
    );
  }

  const Btn = ({
    label,
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 rounded-md px-3 py-1.5 text-sm border transition-colors",
        isActive
          ? "bg-[var(--card)]/90 text-foreground border-[var(--primary)]"
          : "bg-card text-foreground border-border hover:bg-[#F8F6F2]",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border !bg-[var(--primary)] text-white flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
        {value !== null && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-white/90 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="px-4 py-3">
        <div className="flex gap-2">
          <Btn label="Todos" isActive={value === null} onClick={() => onChange(null)} />
          <Btn label="Sí"    isActive={value === true} onClick={() => onChange(true)} />
          <Btn label="No"    isActive={value === false} onClick={() => onChange(false)} />
        </div>
      </div>
    </div>
  );
}
