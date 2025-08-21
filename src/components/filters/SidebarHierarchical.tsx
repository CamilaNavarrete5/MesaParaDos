"use client";

import { useEffect, useState } from "react";
import CustomCheckbox from "../ui/CustomCheckbox";

type Tree3 = Record<string, Record<string, Record<string, number>>>;

// desplazamiento
function scrollOpenedIntoView(e: React.SyntheticEvent<HTMLDetailsElement>) {
  const el = e.currentTarget;
  if ((el as HTMLDetailsElement).open) {
    // Deja un margen arriba para que se vean bien los hijos
    el.classList.add("scroll-mt-20");
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

/** Chevron que rota con group-open */
function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14"
      className={className}
      fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SidebarHierarchical({
  title = "Ubicaciones",
  tree,
  isL1, isL2, isL3,
  onToggleL1, onToggleL2, onToggleL3,
  onClear,
}: {
  title?: string;
  tree: Tree3;
  isL1: (l1: string) => boolean;
  isL2: (l1: string, l2: string) => boolean;
  isL3: (l1: string, l2: string, l3: string) => boolean;
  onToggleL1: (l1: string) => void;
  onToggleL2: (l1: string, l2: string) => void;
  onToggleL3: (l1: string, l2: string, l3: string) => void;
  onClear?: () => void;
}) {
  // Evitar SSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border !bg-[var(--primary)] text-white flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
          {onClear && <span className="h-3 w-10 bg-white/30 rounded" />}
        </div>
        <ul className="divide-y divide-border p-2">
          {[0, 1, 2].map(i => (
            <li key={i} className="py-2"><div className="h-4 w-52 bg-[#ECE6DC] rounded" /></li>
          ))}
        </ul>
      </div>
    );
  }

  const provinces = Object.keys(tree);

  const anyActive = Object.keys(tree).some((p) => {
    if (isL1(p)) return true;
    const cities = tree[p];
    return Object.keys(cities).some((c) => {
      if (isL2(p, c)) return true;
      const barrios = cities[c];
      return Object.keys(barrios).some((b) => isL3(p, c, b));
    });
  });

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border !bg-[var(--primary)] text-white flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">{title}</h3>

        {onClear && anyActive && (
          <button className="text-xs text-white/90 hover:underline" onClick={onClear}>
            Limpiar
          </button>
        )}

      </div>

      <div className="divide-y divide-border">
        {provinces.map((p) => {
          const cities = tree[p];
          const pActive = isL1(p);

          return (
            //Provincias
            <details
              key={p}
              className="group/prov"
              onToggle={scrollOpenedIntoView}
            >
              <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between
                    hover:bg-[#F8F6F2] transition-colors">
                <span className="flex items-center gap-2">
                  <Chevron className="inline-block shrink-0 transition-transform -rotate-90 group-open/prov:rotate-0 text-[#6e6e6e]" />
                  <span className={pActive ? "text-brown font-medium" : ""}>{p}</span>
                </span>
                <CustomCheckbox
                  checked={pActive}
                  onChange={() => onToggleL1(p)}
                  onClick={(e) => e.stopPropagation()}
                />
              </summary>

              {/* Ciudades */}
              <div>
                {Object.keys(cities).map((c) => {
                  const barrios = cities[c];
                  const cActive = isL2(p, c);

                  return (
                    // -- Ciudad -----------------------------------------------------------
                    <details
                      key={`${p}__${c}`}
                      className="group/city"
                      onToggle={scrollOpenedIntoView}
                    >
                      <summary className="cursor-pointer list-none pl-6 pr-4 py-2 flex items-center justify-between 
                    hover:bg-[#F8F6F2] transition-colors">
                        <span className="flex items-center gap-2">
                          <Chevron className="inline-block shrink-0 transition-transform -rotate-90 group-open/city:rotate-0 text-[#6e6e6e]" />
                          <span className={cActive ? "text-brown font-medium" : ""}>{c}</span>
                        </span>
                        <CustomCheckbox
                          checked={cActive}
                          onChange={() => onToggleL2(p, c)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </summary>

                      {/* Barrios */}
                      <ul>
                        {Object.keys(barrios).map((barrio) => {
                          const bActive = isL3(p, c, barrio);
                          return (
                            <li
                              key={`${p}__${c}__${barrio}`}
                              className="flex items-center justify-between pl-10 pr-4 py-2 
             hover:bg-[#F8F6F2] transition-colors"
                            >
                              <span className={bActive ? "text-brown font-medium" : ""}>{barrio}</span>
                              <CustomCheckbox
                                checked={bActive}
                                onChange={() => onToggleL3(p, c, barrio)}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  );
                })}
              </div>
            </details>

          );
        })}
      </div>
    </div>
  );
}




