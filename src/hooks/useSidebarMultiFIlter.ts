"use client";

import { useMemo, useState, useCallback } from "react";

function norm(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function useSidebarMultiFilter<T>(
  data: T[],
  opts: { field: keyof T & string; emptyLabel?: string }
) {
  const { field, emptyLabel = "Sin dato" } = opts;

  const items = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of data) {
      const v = (it[field] as unknown as string) || emptyLabel;
      map.set(v, (map.get(v) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => {
        const A = norm(a.label), B = norm(b.label);
        return A < B ? -1 : A > B ? 1 : 0;
      });
  }, [data, field, emptyLabel]);

  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((label: string) => {
    setSelected(prev => (prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const isSelected = useCallback((label: string) => selected.includes(label), [selected]);

  return { items, selected, toggle, clear, isSelected };
}
