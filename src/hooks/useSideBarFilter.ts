// src/hooks/useSidebarFilter.ts
"use client";

import { useMemo, useState } from "react";

export function useSidebarFilter<T>(
  data: T[],
  opts: {
    field: keyof T & string;
    allLabel?: string;
    emptyLabel?: string;
  }
) {
  const {
    field,
    allLabel = "Todas",
    emptyLabel = "Sin dato",
  } = opts;

  const items = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of data) {
      const val = (it[field] as string) || emptyLabel;
      map.set(val, (map.get(val) ?? 0) + 1);
    }
    const arr = [{ label: allLabel, count: data.length }];
    for (const [label, count] of Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], "es")
    )) {
      arr.push({ label, count });
    }
    return arr;
  }, [data, field, allLabel, emptyLabel]);

  const [selected, setSelected] = useState<string>(allLabel);

  const filteredData = useMemo(() => {
    if (selected === allLabel) return data;
    return data.filter(
      (it) => ((it[field] as string) || emptyLabel) === selected
    );
  }, [data, field, selected, allLabel, emptyLabel]);

  return { items, selected, setSelected, filteredData };
}
