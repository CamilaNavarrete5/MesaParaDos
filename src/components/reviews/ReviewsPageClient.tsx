// src/components/reviews/ReviewsPageClient.tsx
"use client";

import ReviewsBrowser from "@/src/components/reviews/ReviewsBrowser";
import Link from "next/link";
import type { Review } from "@/src/types/review";
import { useSidebarFilter } from "@/src/hooks/useSideBarFilter";
import SidebarFilters from "./SideBar";

export default function ReviewsPageClient({ reviews }: { reviews: Review[] }) {
  // Filtro por categoría
  const cat = useSidebarFilter(reviews, {
    field: "category",
    allLabel: "Todas",
    emptyLabel: "Sin categoría",
  });

  // Filtro por ubicación (usa el resultado filtrado de categoría)
  const loc = useSidebarFilter(cat.filteredData, {
    field: "location",
    allLabel: "Todas",
    emptyLabel: "Sin ubicación",
  });

  const filtered = loc.filteredData;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      {/* Título y CTA */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reseñas</h1>
        <Link
          href="/review/new"
          className="hidden sm:inline-flex items-center rounded-full bg-brown px-3 py-2 text-sm font-semibold text-background shadow-sm hover:bg-accent transition-colors"
        >
          + Agregar reseña
        </Link>
      </div>

      {/* Descripción */}
      <div className="rounded-2xl p-3 border border-border bg-card">
        <p className="text-muted text-justify">
          Descubrimos, probamos y compartimos. En Mesa para Dos te contamos nuestras aventuras gastronomicas en restaurantes, bares y cafeterias: desde un cafe con aroma intenso
          hasta el plato que nos robó una sonrisa. Opiniones sinceras, fotos que abren el apetito y un toque personal en cada reseña.
        </p>
      </div>

      {/* Layout con sidebar */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 space-y-4">
          <SidebarFilters
            title="Categorías"
            items={cat.items.map((it) => ({ ...it, active: it.label === cat.selected }))}
            onSelect={cat.setSelected}
          />
          <SidebarFilters
            title="Ubicaciones"
            items={loc.items.map((it) => ({ ...it, active: it.label === loc.selected }))}
            onSelect={loc.setSelected}
          />
        </div>

        {/* Listado filtrado */}
        <div className="col-span-12 md:col-span-9">
          <ReviewsBrowser reviews={filtered} />
        </div>
      </section>
    </main>
  );
}
