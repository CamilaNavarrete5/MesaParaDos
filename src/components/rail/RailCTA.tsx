import Link from "next/link";
import RailCard from "./RailCard";

type Props = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  href: string;
};

export default function RailCTA({ title, subtitle, ctaLabel, href }: Props) {
  return (
    <RailCard title={title} subtitle={subtitle}>
      <Link
        href={href}
        className="inline-flex items-center rounded-full bg-brown px-3 py-2 text-sm font-semibold text-background shadow-sm transition-colors hover:bg-accent"
      >
        {ctaLabel}
      </Link>
    </RailCard>
  );
}
