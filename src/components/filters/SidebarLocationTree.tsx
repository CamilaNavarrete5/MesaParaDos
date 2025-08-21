// "use client";

// import { useMemo, useState, useCallback } from "react";
// import type { Review } from "@/src/types/review";

// type Tree = Record<string, Record<string, number>>; // { provincia: { barrio: count } }

// function buildTree(reviews: Review[]): Tree {
//   const tree: Tree = {};
//   for (const r of reviews) {
//     // Preferí los campos dedicados si existen
//     const province =
//       (r as any).province ??
//       r.location?.split(" - ")[0] ??
//       "Sin provincia";
//     const zone =
//       (r as any).zone ??
//       r.location?.split(" - ")[1] ??
//       "Sin zona";

//     tree[province] ||= {};
//     tree[province][zone] = (tree[province][zone] ?? 0) + 1;
//   }

//   // ordenar por nombre (es)
//   const ordered: Tree = {};
//   for (const p of Object.keys(tree).sort((a, b) => a.localeCompare(b, "es"))) {
//     const zones = tree[p];
//     const orderedZones: Record<string, number> = {};
//     for (const z of Object.keys(zones).sort((a, b) => a.localeCompare(b, "es"))) {
//       orderedZones[z] = zones[z];
//     }
//     ordered[p] = orderedZones;
//   }
//   return ordered;
// }

// export type LocationSelection = {
//   provinces: string[];                      // provincias “enteras”
//   zonesByProvince: Record<string, string[]>; // barrios seleccionados por provincia
// };

// export default function SidebarLocationTree({
//   reviews,
//   title = "Ubicaciones",
//   onChange,
// }: {
//   reviews: Review[];
//   title?: string;
//   onChange?: (sel: LocationSelection) => void;
// }) {
//   const tree = useMemo(() => buildTree(reviews), [reviews]);

//   // selección
//   const [selectedProvinces, setSelectedProvinces] = useState<Set<string>>(new Set());
//   const [selectedZones, setSelectedZones] = useState<Record<string, Set<string>>>({}); // por provincia

//   const emit = useCallback(
//     (provSet: Set<string>, zonesDict: Record<string, Set<string>>) => {
//       if (!onChange) return;
//       const provinces = Array.from(provSet);
//       const zonesByProvince: Record<string, string[]> = {};
//       for (const [p, set] of Object.entries(zonesDict)) {
//         if (set.size) zonesByProvince[p] = Array.from(set);
//       }
//       onChange({ provinces, zonesByProvince });
//     },
//     [onChange]
//   );

//   const toggleProvince = useCallback(
//     (p: string) => {
//       setSelectedProvinces(prev => {
//         const next = new Set(prev);
//         if (next.has(p)) next.delete(p);
//         else next.add(p);
//         // al cambiar provincia, limpiamos barrios específicos (regla simple)
//         setSelectedZones(curr => {
//           const { [p]: _, ...rest } = curr;
//           return rest;
//         });
//         // emitir con estado “estimado” (sincronizamos en efecto micro)
//         const estimate = new Set(next);
//         const estimateZones = { ...selectedZones };
//         emit(estimate, estimateZones);
//         return next;
//       });
//     },
//     [emit, selectedZones]
//   );

//   const toggleZone = useCallback(
//     (p: string, z: string) => {
//       setSelectedProvinces(prev => (prev.has(p) ? prev : new Set(prev).add(p)));
//       setSelectedZones(prev => {
//         const set = new Set(prev[p] ?? []);
//         if (set.has(z)) set.delete(z);
//         else set.add(z);
//         const next = { ...prev, [p]: set };
//         // emitir
//         emit(new Set(selectedProvinces).add(p), next);
//         return next;
//       });
//     },
//     [emit, selectedProvinces]
//   );

//   const clearAll = useCallback(() => {
//     setSelectedProvinces(new Set());
//     setSelectedZones({});
//     emit(new Set(), {});
//   }, [emit]);

//   const isProvinceSelected = useCallback((p: string) => selectedProvinces.has(p), [selectedProvinces]);
//   const isZoneSelected = useCallback((p: string, z: string) => !!selectedZones[p]?.has(z), [selectedZones]);

//   const provinces = Object.keys(tree);

//   return (
//     <aside className="rounded-xl border border-border bg-card shadow-sm">
//       <div className="px-4 py-3 border-b border-border flex items-center justify-between">
//         <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
//         {(selectedProvinces.size > 0 || Object.keys(selectedZones).length > 0) && (
//           <button onClick={clearAll} className="text-xs text-brown hover:underline">
//             Limpiar
//           </button>
//         )}
//       </div>

//       <div className="divide-y divide-border">
//         {provinces.map((p) => {
//           const zones = tree[p];
//           const pActive = isProvinceSelected(p);
//           const total = Object.values(zones).reduce((a, b) => a + b, 0);

//           return (
//             <details key={p} className="group open:bg-[#F8F6F2]">
//               <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between">
//                 <span className="flex items-center gap-3">
//                   {/* checkbox custom */}
//                   <span
//                     role="checkbox"
//                     aria-checked={pActive}
//                     tabIndex={0}
//                     onClick={(e) => { e.preventDefault(); toggleProvince(p); }}
//                     onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleProvince(p); } }}
//                     className={[
//                       "inline-flex h-4 w-4 items-center justify-center rounded border",
//                       pActive ? "bg-primary border-primary text-background" : "border-border text-transparent",
//                     ].join(" ")}
//                   >
//                     ✓
//                   </span>
//                   <span className={pActive ? "text-brown font-medium" : ""}>{p}</span>
//                 </span>
//                 <span className="text-[11px] font-semibold tracking-wider text-background bg-[#3C3C3C] rounded px-2 py-0.5">
//                   {String(total).padStart(2, "0")}
//                 </span>
//               </summary>

//               {/* Zonas */}
//               <ul className="px-4 pb-3 space-y-1">
//                 {Object.entries(zones).map(([z, count]) => {
//                   const zActive = isZoneSelected(p, z);
//                   return (
//                     <li key={z}>
//                       <button
//                         onClick={() => toggleZone(p, z)}
//                         className={[
//                           "w-full flex items-center justify-between text-left rounded px-2 py-1.5 transition-colors",
//                           zActive ? "bg-[#F1EEE8]" : "hover:bg-[#F1EEE8]",
//                         ].join(" ")}
//                         aria-pressed={zActive}
//                       >
//                         <span className="flex items-center gap-2 text-sm">
//                           <span
//                             className={[
//                               "inline-flex h-4 w-4 items-center justify-center rounded border",
//                               zActive ? "bg-primary border-primary text-background" : "border-border text-transparent",
//                             ].join(" ")}
//                           >
//                             ✓
//                           </span>
//                           {z}
//                         </span>
//                         <span className="text-[11px] font-semibold tracking-wider text-background bg-[#3C3C3C] rounded px-2 py-0.5">
//                           {String(count).padStart(2, "0")}
//                         </span>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </details>
//           );
//         })}
//       </div>
//     </aside>
//   );
// }
