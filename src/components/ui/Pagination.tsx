// src/components/ui/Pagination.tsx
"use client";

import React, { useEffect, useMemo } from "react";

type Props = {
  totalItems: number;
  page: number;                 // 1-indexed
  pageSize?: number;            // default 6
  onChange: (page: number) => void;
  className?: string;
  maxButtons?: number;          // ventana numérica (default 5)
  hideWhenSinglePage?: boolean; // default true
  /** Si lo pasás, al cambiar de página hace scroll hasta este ref (manteniendo el paginador visible) */
  anchorRef?: React.RefObject<HTMLElement>;
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export default function Pagination({
  totalItems,
  page,
  pageSize = 6,
  onChange,
  className = "",
  maxButtons = 5,
  hideWhenSinglePage = true,
  anchorRef,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  // Si por filtros la página se sale de rango, la corregimos
  useEffect(() => {
    if (page !== safePage) onChange(safePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // Scroll opcional al anchor cuando cambio de página
  useEffect(() => {
    if (!anchorRef?.current) return;
    // solo cuando el usuario navega (no en el primer render)
    // podés quitar el requestAnimationFrame si no te hace falta
    requestAnimationFrame(() => {
      anchorRef.current!.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (hideWhenSinglePage && totalPages <= 1) return null;

  const go = (n: number) => {
    const clamped = Math.max(1, Math.min(totalPages, n));
    if (clamped !== page) onChange(clamped);
  };

  // Calcular ventana de botones
  const { start, end, showStartEllipsis, showEndEllipsis } = useMemo(() => {
    const half = Math.floor(maxButtons / 2);
    let s = Math.max(1, safePage - half);
    let e = Math.min(totalPages, s + maxButtons - 1);
    if (e - s + 1 < maxButtons) s = Math.max(1, e - maxButtons + 1);
    return {
      start: s,
      end: e,
      showStartEllipsis: s > 2,
      showEndEllipsis: e < totalPages - 1,
    };
  }, [safePage, totalPages, maxButtons]);

  const btnBase =
    "inline-flex h-9 min-w-[36px] items-center justify-center rounded-full " +
    "border border-border bg-card/80 text-brown/90 transition " +
    "hover:bg-[#F8F6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]";

  const btnGhost =
    "inline-flex h-9 min-w-[36px] px-3 items-center justify-center rounded-full " +
    "border border-transparent text-brown/90 hover:bg-[#F8F6F2] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]";

  const btnActive =
    "inline-flex h-9 min-w-[36px] px-3 items-center justify-center rounded-full " +
    "bg-brown text-white border border-brown " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown";

  return (
    <nav
      className={`mt-6 flex items-center justify-center gap-2 text-brown ${className}`}
      aria-label="Paginación"
    >
      {/* Prev */}
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className={`${btnBase} disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Página anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* 1 */}
      {start > 1 && (
        <button type="button" onClick={() => go(1)} className={btnGhost}>
          1
        </button>
      )}

      {showStartEllipsis && <span className="px-2 text-brown/50 select-none">…</span>}

      {/* ventana */}
      {range(start, end).map((n) => {
        const active = n === safePage;
        return (
          <button
            key={n}
            type="button"
            onClick={() => go(n)}
            aria-current={active ? "page" : undefined}
            className={active ? btnActive : btnGhost}
          >
            {n}
          </button>
        );
      })}

      {showEndEllipsis && <span className="px-2 text-brown/50 select-none">…</span>}

      {/* último */}
      {end < totalPages && (
        <button type="button" onClick={() => go(totalPages)} className={btnGhost}>
          {totalPages}
        </button>
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        className={`${btnBase} disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Página siguiente"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}
