import type { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function RailCard({ title, subtitle, children, footer, className }: Props) {
  return (
    <section className={[ "rounded-lg border border-border bg-card shadow-sm",
    "min-h-[120px] flex flex-col justify-between",
    className ?? ""].join(" ")}>
      {(title || subtitle) && (
        <header className="px-4 pt-4">
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </header>
      )}

      <div className="px-4 py-3">{children}</div>

      {footer && <footer className="px-4 pb-4">{footer}</footer>}
    </section>
  );
}
