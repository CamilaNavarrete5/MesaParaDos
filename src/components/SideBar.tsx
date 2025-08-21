// "use client";

// import { useEffect, useState } from "react";

// type Item = { label: string; count: number; active?: boolean };

// interface Props {
//   title?: string;
//   items: Item[];
//   onSelect?: (label: string) => void;
// }

// export default function SidebarFilters({
//   title = "Categorías",
//   items,
//   onSelect,
// }: Props) {

//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   if (!mounted) {
//     return (
//       <div className="rounded-xl border border-border bg-card shadow-sm">
//         <div className="px-4 py-3 border-b border-border">
//           <h3 className="text-sm font-semibold text-foreground tracking-wide">
//             {title}
//           </h3>
//         </div>
//         <ul className="divide-y divide-border">
//           {[0, 1, 2, 3].map((i) => (
//             <li key={i} className="px-4 py-3">
//               <div className="h-4 w-40 bg-[#ECE6DC] rounded" />
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border border-border bg-card shadow-sm">
//       <div className="px-4 py-3 border-b border-border">
//         <h3 className="text-sm font-semibold text-foreground tracking-wide">
//           {title}
//         </h3>
//       </div>

//       <ul className="divide-y divide-border">
//         {items.map((it) => (
//           <li key={it.label}>
//             <button
//               onClick={() => onSelect?.(it.label)}
//               className={[
//                 "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
//                 it.active ? "bg-[#F8F6F2]" : "hover:bg-[#F8F6F2]",
//               ].join(" ")}
//             >
//               <span
//                 className={[
//                   "text-sm",
//                   it.active ? "text-brown font-medium" : "text-foreground",
//                 ].join(" ")}
//               >
//                 {it.label}
//               </span>
//               <span className="text-[11px] font-semibold tracking-wider text-background bg-[#3C3C3C] rounded px-2 py-0.5">
//                 {String(it.count).padStart(2, "0")}
//               </span>
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
