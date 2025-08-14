
// src/components/ui/Badge.tsx
export default function Badge({
  children,
  variant = "solid",
}: {
  children: string | number;
  variant?: "solid" | "soft";
}) {
  const base = "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold tracking-wider";
  const styles =
    variant === "solid"
      ? "text-background bg-[#3C3C3C]"
      : "text-brown bg-[#F8F6F2] border border-border";
  return <span className={`${base} ${styles}`}>{children}</span>;
}
