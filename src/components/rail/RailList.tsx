import Link from "next/link";
import RailCard from "./RailCard";

export type RailListItem = {
  label: string;
  href: string;
  meta?: string;   // ej: "hace 2 días", "⭐ 4.6", "Palermo"
};

type Props = {
  title: string;
  items: RailListItem[];
  emptyText?: string;
  footerLink?: { label: string; href: string };
};

export default function RailList({ title, items, emptyText = "No hay elementos aún.", footerLink }: Props) {
  return (
    <RailCard title={title}>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.href} className="flex items-center justify-between gap-3">
              <Link href={it.href} className="text-sm text-brown hover:underline line-clamp-1">
                {it.label}
              </Link>
              {it.meta && <span className="text-xs text-muted shrink-0">{it.meta}</span>}
            </li>
          ))}
        </ul>
      )}
      {footerLink && (
        <div className="mt-3">
          <Link href={footerLink.href} className="text-sm text-brown hover:underline">
            {footerLink.label} →
          </Link>
        </div>
      )}
    </RailCard>
  );
}
