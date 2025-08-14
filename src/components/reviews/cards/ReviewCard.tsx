// src/components/cards/ReviewCard.tsx
import Link from "next/link";
import {
  CardBase,
} from "@/src/components/ui/CardBase";
import {
  CardMedia,
  CardBody,
  CardRow,
  CardTitle,
  CardText,
  CardMuted,
} from "@/src/components/ui/Card";
import Avatar from "@/src/components/ui/Avatar"; // si no lo tenés, podés usar <img />
import Stars from "@/src/components/ui/Stars";   // tu componente de estrellas
import type { Review } from "@/src/types/review";

export default function ReviewCard(props: Review) {
  const {
    id, title, description, imageSrc,
    userName, userAvatarSrc, rating, createdAt,
    location
  } = props;

  return (
    <CardBase
      header={
        <Link href={`/review/${id}`} aria-label={`Ver reseña: ${title}`}>
          <CardMedia src={imageSrc} alt={title} />
        </Link>
      }
      content={
        <>
          {/* Usuario */}
          <CardRow className="mb-1">
            {userAvatarSrc ? (
              <Avatar src={userAvatarSrc} alt={`Foto de ${userName}`} />
            ) : (
              // fallback simple
              <div className="h-7 w-7 rounded-full bg-border" />
            )}
            <p className="truncate font-medium">{userName}</p>
          </CardRow>

          {/* Título (clickeable) */}
          <Link href={`/review/${id}`}>
            <CardTitle className="hover:underline">{title}</CardTitle>
          </Link>

          {/* Estrellas */}
          <CardRow>
            <span className="text-primary">
              <Stars value={rating} />
            </span>
            <span className="text-sm text-muted">{rating}/5</span>
          </CardRow>

          {/* Descripción */}
          <CardText className="line-clamp-3">{description}</CardText>

          {/* Meta */}
          <div className="flex items-center gap-2">
            {location && <CardMuted>{location}</CardMuted>}
            {createdAt && (
              <CardMuted>
                <time dateTime={createdAt}>
                  {new Intl.DateTimeFormat("es-AR", {
                    dateStyle: "short",
                    timeZone: "UTC",
                  }).format(new Date(createdAt))}
                </time>
              </CardMuted>
            )}
          </div>
        </>
      }
      footer={
        <div className="flex justify-end">
          <Link
            href={`/review/${id}`}
            className="inline-block rounded-full bg-brown px-4 py-1.5 text-sm font-semibold text-background shadow-sm transition-colors duration-200 hover:bg-accent"
          >
            Ver reseña
          </Link>
        </div>
      }
    />
  );
}
