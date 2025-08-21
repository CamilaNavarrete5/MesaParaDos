import Image from "next/image";
import Link from "next/link";
import RailCard from "./RailCard";

type Props = {
  title: string;
  imgSrc: string;
  alt: string;
  excerpt?: string;
  href: string;
};

export default function RailMedia({ title, imgSrc, alt, excerpt, href }: Props) {
  return (
    <RailCard>
      <figure className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
        <Image src={imgSrc} alt={alt} fill className="object-cover" sizes="320px" />
      </figure>

      <h4 className="mt-3 font-semibold text-foreground">{title}</h4>
      {excerpt && <p className="mt-1 text-sm text-muted">{excerpt}</p>}

      <div className="mt-3">
        <Link href={href} className="text-sm text-brown hover:underline">
          Ver más →
        </Link>
      </div>
    </RailCard>
  );
}
