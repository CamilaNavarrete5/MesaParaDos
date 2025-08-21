"use client";

import { useEffect, useState, useId } from "react";

function StarIcon({
  variant, // "empty" | "half" | "full"
  size = 22,
}: {
  variant: "empty" | "half" | "full";
  size?: number;
}) {
  const gid = useId(); // id único para el gradiente
  if (variant === "half") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <defs>
          <linearGradient id={`halfFill-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.45L12 18.9 6.2 21.36l1.1-6.45-4.7-4.58 6.5-.95L12 3.5z"
          fill={`url(#halfFill-${gid})`}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={variant === "full" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.45L12 18.9 6.2 21.36l1.1-6.45-4.7-4.58 6.5-.95L12 3.5z" />
    </svg>
  );
}

export default function SidebarRatingMin({
  title = "Valoración mínima",
  value,
  onChange,
}: {
  title?: string;
  value: number; // 0..5 (pasos de 0.5)
  onChange: (v: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState<number | null>(null); // previsualización

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="px-4 py-3 border-b border-border">
          <div className="h-4 w-40 bg-[#ECE6DC] rounded" />
        </div>
        <div className="px-4 py-3">
          <div className="h-6 w-48 bg-[#ECE6DC] rounded" />
        </div>
      </div>
    );
  }

  const starVariant = (i: number, current: number): "empty" | "half" | "full" => {
    const half = i - 0.5;
    if (current >= i) return "full";
    if (current >= half) return "half";
    return "empty";
  };

  const display = hover ?? value; // lo que se ve (hover o valor real)

  const setHalf = (i: number) => {
    const v = i - 0.5;
    onChange(value === v ? 0 : v);
  };
  const setFull = (i: number) => onChange(value === i ? 0 : i);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="px-4 py-2 bg-[#A3B18A] text-white border-b border-border flex items-center justify-between rounded-t-xl">
        <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
        {value > 0 && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="text-xs text-card hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Cuerpo */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }, (_, idx) => {
            const i = idx + 1;

            return (
              <div
                key={i}
                className="relative select-none h-7 w-7"
                onMouseLeave={() => setHover(null)}
              >
                {/* mitad izquierda (0.5) */}
                <button
                  type="button"
                  onClick={() => setHalf(i)}
                  onMouseEnter={() => setHover(i - 0.5)}
                  aria-label={`${(i - 0.5).toFixed(1)} estrellas mín.`}
                  title={`${(i - 0.5).toFixed(1)}★`}
                  className="absolute left-0 top-0 h-full w-1/2"
                />

                {/* mitad derecha (1.0) */}
                <button
                  type="button"
                  onClick={() => setFull(i)}
                  onMouseEnter={() => setHover(i)}
                  aria-label={`${i} estrellas mín.`}
                  title={`${i}★`}
                  className="absolute right-0 top-0 h-full w-1/2"
                />

                {/* ÚNICO icono: decide por display (hover o valor real) */}
                <span
                  className={`pointer-events-none block transition-colors ${starVariant(i, display) === "empty"
                      ? "text-border"
                      : display === hover
                        ? "text-[#F5C85B]" // color más claro para hover
                        : "text-[#D4A017]" // color fuerte cuando está seleccionado
                    }`}
                >
                  <StarIcon variant={starVariant(i, display)} size={22} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
