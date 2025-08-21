"use client";

import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";

type SortValue = "ratingDesc" | "ratingAsc" | "newest" | "oldest" | null;

const options: { value: SortValue; label: string }[] = [
  { value: null, label: "Elegir opción" },
  { value: "ratingDesc", label: "Mejor puntuados" },
  { value: "ratingAsc", label: "Menos puntuados" },
  { value: "newest", label: "Más nuevos" },
  { value: "oldest", label: "Más viejos" },
];

export default function SortBy({
  value,
  onChange,
  title = "Ordenar por",
}: {
  value: SortValue;
  onChange: (v: SortValue) => void;
  title?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm h-[68px]" />
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 bg-[#A3B18A] border-b border-border flex items-center justify-between rounded-t-xl">
        <h3 className="text-sm font-semibold tracking-wide text-white">
          {title}
        </h3>
        {value !== null && (
          <button
            type="button"
            onClick={() => onChange(null)} // volver a "Elegir opción"
            className="text-xs text-card hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Listbox */}
      <div className="px-4 py-2">
        <Listbox value={value} onChange={onChange}>
          <div className="relative">
            <Listbox.Button className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary">
              {options.find((o) => o.value === value)?.label ?? "Elegir opción"}
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 w-full rounded-md border border-border bg-card shadow-lg z-10">
              {options.map((opt) => (
                <Listbox.Option
                  key={String(opt.value)}
                  value={opt.value}
                  className={({ active }) =>
                    `cursor-pointer px-3 py-2 text-sm ${
                      active ? "bg-accent/10" : ""
                    }`
                  }
                >
                  {opt.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
