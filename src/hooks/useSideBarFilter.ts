"use client";

import { useMemo, useState } from "react";

function getByPath<T extends Record<string, any>>(obj: T, path: string): string | undefined {
  return path.split(".").reduce<any>((acc, key) => (acc == null ? acc : acc[key]), obj) as any;
}

// normaliza para ordenar igual en SSR y cliente
function norm(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function useSidebarFilter<T>(
  data: T[],
  opts: {
    field: keyof T & string | string; // "category" o "ubicacion.province"
    allLabel?: string;
    emptyLabel?: string;
  }
) {
  const { field, allLabel = "Todas", emptyLabel = "Sin dato" } = opts;

  const items = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of data) {
      const raw = typeof field === "string" ? getByPath(it as any, field) : (it as any)[field];
      const val = (raw as string) || emptyLabel;
      map.set(val, (map.get(val) ?? 0) + 1);
    }

    // orden determinista
    const arr = [{ label: allLabel, count: data.length }];
    const sorted = Array.from(map.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => {
        const A = norm(a.label);
        const B = norm(b.label);
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      });

    return arr.concat(sorted);
  }, [data, field, allLabel, emptyLabel]);

  const [selected, setSelected] = useState<string>(allLabel);

  const filteredData = useMemo(() => {
    if (selected === allLabel) return data;
    return data.filter((it) => {
      const raw = typeof field === "string" ? getByPath(it as any, field) : (it as any)[field];
      const val = (raw as string) || emptyLabel;
      return val === selected;
    });
  }, [data, field, selected, allLabel, emptyLabel]);

  return { items, selected, setSelected, filteredData };
}
