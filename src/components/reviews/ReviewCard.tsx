// src/components/reviews/ReviewCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import type { Review } from "@/src/types/review";

import {
  CardRoot,
  CardBody,
  CardRow,
  CardTitle,
  CardText,
  CardMuted,
  CardFooter,
} from "@/src/components/ui/Card";
import Avatar from "@/src/components/ui/Avatar";
import Stars from "@/src/components/ui/Stars";
import { slugify } from "@/src/lib/slug";
import { formatDateSafe } from "@/src/lib/formatDataSafe";

/** Alturas usadas por la página para los “ghosts” (no tocar los valores) */
export const REVIEW_CARD_HEIGHT = {
  compact: "h-[360px]",
  regular: "h-[420px]",
} as const;

type ReviewCardProps = Review & {
  variant?: "default" | "compact";
};

export default function ReviewCard(props: ReviewCardProps) {
  const {
    title,
    description,
    imageSrc,
    userName,
    userAvatarSrc,
    rating,
    createdAt,
    province, city, neighborhood,
    location, // compat viejo
    slug: slugProp,
    variant = "compact",
  } = props;

  const slug = slugProp ?? slugify(title);
  const isCompact = variant === "compact";

  // Mantengo 360px para que el layout/paginación sigan alineados
  const cardHeight = isCompact ? REVIEW_CARD_HEIGHT.compact : REVIEW_CARD_HEIGHT.regular;
  // Imagen más grande
  const mediaAspect = isCompact ? "aspect-[5/4]" : "aspect-[16/9]";

  // Línea meta
  const meta =
    [province, city, neighborhood].filter(Boolean).join(", ") ||
    location ||
    "";

  return (
    <CardRoot
      as="article"
      className={[
        "group flex flex-col rounded-2xl border-1 border-brown bg-card shadow-sm transition-all duration-200",
        "hover:shadow-md hover:-translate-y-1 hover:border-[#c7ab93]",
        cardHeight,
      ].join(" ")}
    >
      {/* Imagen */}
      <div className={["relative mx-3 mt-3 overflow-hidden rounded-xl", mediaAspect].join(" ")}>
        <Link href={`/review/${slug}`} aria-label={`Ver reseña: ${title}`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(min-width:1024px) 320px, 50vw"
          />
        </Link>
      </div>

      {/* Contenido */}
      <CardBody className="flex-1 px-4 pt-3">
        {/* Título */}
        <Link href={`/review/${slug}`}>
          <CardTitle className="text-[20px] leading-tight text-brown hover:underline line-clamp-2">
            {title}
          </CardTitle>
        </Link>

        {/* Estrellas*/}
        <CardRow className="mt-1">
          <Stars value={rating} className="text-[#C98F2B]" size={18} />
        </CardRow>

        {/* Usuario (chico) */}
        <CardRow className="mt-1">
          {userAvatarSrc ? (
            <Avatar src={userAvatarSrc} alt={`Foto de ${userName}`} size={24} />
          ) : (
            <div className="h-6 w-6 rounded-full bg-border" />
          )}
          <p className="truncate text-xs text-foreground/80">{userName}</p>
        </CardRow>

        {/* Descripción (2 líneas) */}
        <CardText className="mt-1 text-[15px] leading-snug line-clamp-2">
          {description}
        </CardText>

        {/* Ubicación */}
        {(meta || createdAt) && (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {meta && <CardMuted className="text-xs">{meta}</CardMuted>}
          </div>
        )}
      </CardBody>

      {/* Footer pegado abajo */}
      <CardFooter className="px-4 pb-1 pt-1">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/review/${slug}`}
            className="inline-block rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8D9F77]"
          >
            Ver reseña
          </Link>

          <button
            type="button"
            aria-label="Guardar"
            className="rounded-full p-1 text-accent/90 hover:bg-[#F8F6F2]"
          >
            <FaRegHeart size={22} />
          </button>
        </div>
      </CardFooter>
    </CardRoot>
  );
}
