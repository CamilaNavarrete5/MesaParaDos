// src/components/reviews/ReviewsPageClient.tsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import type { Review } from "@/src/types/review";
import { useHierarchicalFilter, useSidebarMultiFilter } from "@/src/hooks";

import ReviewCard from "./ReviewCard";
import Pagination from "../ui/Pagination";

import SortBy from "../filters/SortBy";
import SidebarRatingMin from "../filters/SiderBarRatingMin";
import SidebarChecklist from "../filters/SideBarChecklist";
import SidebarHierarchical from "../filters/SidebarHierarchical";
import SidebarPetFilter from "../filters/SidebarPetFilter";
import { LuFilterX } from "react-icons/lu";

const safeLower = (s?: string) => (s ?? "").toLowerCase();
const NAV_OFFSET = 88; // alto aprox. del navbar para que no tape el paginador

export default function ReviewsPageClient({ reviews }: { reviews: Review[] }) {
  // Estado principal
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] =
    useState<"ratingDesc" | "ratingAsc" | "newest" | "oldest" | null>(null);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [petFilter, setPetFilter] = useState<true | false | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Filtros derivados
  const cat = useSidebarMultiFilter(reviews, {
    field: "category",
    emptyLabel: "Sin categoría",
  });

  const byCat = useMemo(() => {
    if (cat.selected.length === 0) return reviews;
    return reviews.filter((r) =>
      cat.selected.includes(r.category ?? "Sin categoría")
    );
  }, [reviews, cat.selected]);

  const tri = useHierarchicalFilter(byCat, {
    level1Path: "province",
    level2Path: "city",
    level3Path: "neighborhood",
    empty1: "Sin provincia",
    empty2: "Sin ciudad",
    empty3: "Sin barrio",
  });

  // Al entrar (o F5) siempre arriba, sin animación
  useEffect(() => {
    const canRestore = "scrollRestoration" in history;
    const prev = canRestore ? (history.scrollRestoration as "auto" | "manual") : "auto";
    if (canRestore) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => {
      if (canRestore) history.scrollRestoration = prev;
    };
  }, []);

  // Mantener paginación visible al cambiar de página (con offset y doble rAF)
  const pagRef = useRef<HTMLDivElement | null>(null);
  const scrollPaginatorIntoView = () => {
    if (!pagRef.current) return;
    const y = pagRef.current.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  const handlePageChange = (next: number) => {
    setPage(next);
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollPaginatorIntoView);
    });
  };

  // Handlers de filtros (reset a página 1, SIN mover scroll)
  const handleSortChange = (v: typeof sortBy) => {
    setSortBy(v);
    setPage(1);
  };
  const handleRatingMin = (v: number) => {
    setRatingMin(v);
    setPage(1);
  };
  const handlePetFilter = (v: true | false | null) => {
    setPetFilter(v);
    setPage(1);
  };
  const catToggle = (label: string) => {
    cat.toggle(label);
    setPage(1);
  };
  const catClear = () => {
    cat.clear();
    setPage(1);
  };
  const triToggleL1 = (l1: string) => {
    tri.toggleL1(l1);
    setPage(1);
  };
  const triToggleL2 = (l1: string, l2: string) => {
    tri.toggleL2(l1, l2);
    setPage(1);
  };
  const triToggleL3 = (l1: string, l2: string, l3: string) => {
    tri.toggleL3(l1, l2, l3);
    setPage(1);
  };
  const triClearAll = () => {
    tri.clearAll();
    setPage(1);
  };
  const clearAllFilters = () => {
    setSearch("");
    setSortBy(null);
    setRatingMin(0);
    setPetFilter(null);
    setPage(1);
    cat.clear();
    tri.clearAll();
  };

  // Pipeline de datos
  const filteredSorted = useMemo(() => {
    const q = safeLower(search);

    const bySearch = tri.filteredData.filter((r) => {
      const title = safeLower(r.title);
      const desc = safeLower(r.description);
      return title.includes(q) || desc.includes(q);
    });

    const byScore = bySearch.filter((r) => (r.rating ?? 0) >= ratingMin);

    const byPets =
      petFilter === null
        ? byScore
        : byScore.filter((r) => (r.petFriendly ?? false) === petFilter);

    const copy = [...byPets];

    const createdAtMs = (r: Review) => {
      const t = r.createdAt ? new Date(r.createdAt).getTime() : 0;
      return Number.isFinite(t) ? t : 0;
    };

    switch (sortBy) {
      case "ratingDesc":
        copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "ratingAsc":
        copy.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
        break;
      case "newest":
        copy.sort((a, b) => createdAtMs(b) - createdAtMs(a));
        break;
      case "oldest":
        copy.sort((a, b) => createdAtMs(a) - createdAtMs(b));
        break;
      case null:
      default:
        break;
    }
    return copy;
  }, [tri.filteredData, search, ratingMin, sortBy, petFilter]);

  // Paginación
  const total = filteredSorted.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filteredSorted.slice(start, end);

  return (
    <main>
      {/* Cabecera */}
      <div className="container-page section-gap space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-5xl font-bold whitespace-nowrap text-brown">Reseñas</h1>

          <div className="flex flex-1 items-center gap-4 max-w-xl">
            <input
              type="text"
              placeholder="Buscar reseña..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-2"
            />
          </div>

          <button className="whitespace-nowrap rounded-full bg-brown px-3 py-2 text-sm mr-2 text-white hover:bg-accent">
            + Agregar reseña
          </button>
        </div>
      </div>

      {/* Grilla: sidebar + cards */}
      <section className="container-page grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar (desactivamos scroll anchoring) */}
        <aside className="hidden lg:block w-[260px]" style={{ overflowAnchor: "none" }}>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-end">
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 text-sm text-brown hover:text-accent"
                >
                  <LuFilterX className="w-4 h-4" />
                  Quitar filtros
                </button>
              </div>

              <SortBy value={sortBy} onChange={handleSortChange} />
              <SidebarRatingMin value={ratingMin} onChange={handleRatingMin} />
              <SidebarPetFilter value={petFilter} onChange={handlePetFilter} />

              <SidebarChecklist
                title="Categorías"
                items={cat.items.map((it) => ({
                  label: it.label,
                  count: it.count,
                  checked: cat.isSelected(it.label),
                }))}
                onToggle={catToggle}
                onClear={catClear}
              />

              <SidebarHierarchical
                title="Ubicaciones"
                tree={tri.tree}
                isL1={tri.isL1}
                isL2={tri.isL2}
                isL3={tri.isL3}
                onToggleL1={triToggleL1}
                onToggleL2={triToggleL2}
                onToggleL3={triToggleL3}
                onClear={triClearAll}
              />
            </div>
          </div>
        </aside>

        {/* Cards + paginación (también desactivamos anchoring) */}
        <div className="flex flex-col" style={{ overflowAnchor: "none" }}>
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.length > 0 ? (
              pageItems.map((r) => <ReviewCard key={r.id} {...r} variant="compact" />)
            ) : (
              <p className="text-muted">No se encontraron resultados.</p>
            )}
          </section>

          {total > pageSize && (
            <div ref={pagRef} className="mt-8 self-center">
              <Pagination
                totalItems={total}
                page={page}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
