"use client";

import { useMemo, useState, useCallback } from "react";

// Lee propiedades anidadas: "ubicacion.province"
function getByPath<T extends Record<string, any>>(obj: T, path: string, fallback: string) {
  return path.split(".").reduce<any>((acc, k) => (acc == null ? acc : acc[k]), obj) ?? fallback;
}

// Árbol de 3 niveles: provincia -> ciudad -> { barrio: count }
type Tree3 = Record<string, Record<string, Record<string, number>>>;

export function useHierarchicalFilter<T>(
  data: T[],
  opts: {
    level1Path: string; // ej: "ubicacion.province"
    level2Path: string; // ej: "ubicacion.city"
    level3Path: string; // ej: "ubicacion.neighborhood"
    empty1?: string;
    empty2?: string;
    empty3?: string;
  }
) {
  const {
    level1Path, level2Path, level3Path,
    empty1 = "Sin provincia",
    empty2 = "Sin ciudad",
    empty3 = "Sin barrio",
  } = opts;

  // Árbol + orden determinista (evita hydration mismatch)
  const tree = useMemo<Tree3>(() => {
    const t: Tree3 = {};
    for (const it of data as any[]) {
      const l1 = getByPath(it, level1Path, empty1);
      const l2 = getByPath(it, level2Path, empty2);
      const l3 = getByPath(it, level3Path, empty3);
      (t[l1] ||= {}), (t[l1][l2] ||= {}), (t[l1][l2][l3] = (t[l1][l2][l3] ?? 0) + 1);
    }
    const sortObj = (obj: Record<string, any>) =>
      Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b, "en")));
    const out: Tree3 = {};
    for (const p of Object.keys(t).sort((a, b) => a.localeCompare(b, "en"))) {
      const cities = t[p];
      const citiesOut: Record<string, Record<string, number>> = {};
      for (const c of Object.keys(cities).sort((a, b) => a.localeCompare(b, "en"))) {
        citiesOut[c] = sortObj(cities[c]);
      }
      out[p] = citiesOut;
    }
    return out;
  }, [data, level1Path, level2Path, level3Path, empty1, empty2, empty3]);

  // Selección
  const [selL1, setSelL1] = useState<Set<string>>(new Set());
  const [selL2, setSelL2] = useState<Record<string, Set<string>>>({});                  // por provincia
  const [selL3, setSelL3] = useState<Record<string, Record<string, Set<string>>>>({}); // por provincia→ciudad

  const toggleL1 = useCallback((l1: string) => {
    setSelL1(prev => {
      const next = new Set(prev);
      next.has(l1) ? next.delete(l1) : next.add(l1);
      return next;
    });
    setSelL2(prev => { const { [l1]: _, ...rest } = prev; return rest; });
    setSelL3(prev => { const { [l1]: _, ...rest } = prev; return rest; });
  }, []);

  const toggleL2 = useCallback((l1: string, l2: string) => {
    setSelL1(prev => (prev.has(l1) ? prev : new Set(prev).add(l1)));
    setSelL2(prev => {
      const set = new Set(prev[l1] ?? []);
      set.has(l2) ? set.delete(l2) : set.add(l2);
      return { ...prev, [l1]: set };
    });
    setSelL3(prev => {
      const byProv = prev[l1] ?? {};
      const { [l2]: _, ...rest } = byProv;
      return { ...prev, [l1]: rest };
    });
  }, []);

  const toggleL3 = useCallback((l1: string, l2: string, l3: string) => {
    setSelL1(prev => (prev.has(l1) ? prev : new Set(prev).add(l1)));
    setSelL2(prev => (prev[l1]?.has(l2) ? prev : { ...prev, [l1]: new Set([...(prev[l1] ?? []), l2]) }));
    setSelL3(prev => {
      const byProv = prev[l1] ?? {};
      const set = new Set(byProv[l2] ?? []);
      set.has(l3) ? set.delete(l3) : set.add(l3);
      return { ...prev, [l1]: { ...byProv, [l2]: set } };
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelL1(new Set());
    setSelL2({});
    setSelL3({});
  }, []);

  const isL1 = (l1: string) => selL1.has(l1);
  const isL2 = (l1: string, l2: string) => !!selL2[l1]?.has(l2);
  const isL3 = (l1: string, l2: string, l3: string) => !!selL3[l1]?.[l2]?.has(l3);

  // Filtrado
  const filteredData = useMemo(() => {
    if (selL1.size === 0) return data;
    return (data as any[]).filter(it => {
      const a = getByPath(it, level1Path, empty1);
      const b = getByPath(it, level2Path, empty2);
      const c = getByPath(it, level3Path, empty3);
      if (!selL1.has(a)) return false;

      const cities = selL2[a];
      const barriosByCity = selL3[a];

      if (!cities || cities.size === 0) return true; // toda la provincia
      if (!cities.has(b)) return false;

      const barrios = barriosByCity?.[b];
      if (barrios && barrios.size > 0) return barrios.has(c);
      return true;
    }) as T[];
  }, [data, level1Path, level2Path, level3Path, empty1, empty2, empty3, selL1, selL2, selL3]);

  return {
    tree,
    // selección + helpers
    selL1, selL2, selL3,
    isL1, isL2, isL3,
    toggleL1, toggleL2, toggleL3,
    clearAll,
    filteredData,
  };
}
