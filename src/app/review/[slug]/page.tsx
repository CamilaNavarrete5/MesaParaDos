// src/app/review/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReviewBySlug, getLatestReviews } from "@/src/lib/reviews";
import { avgFromRatings, formatDate, RATING_LABELS } from "@/src/lib/review-helpers";
import Stars from "@/src/components/ui/Stars";
import Avatar from "@/src/components/ui/Avatar";
import Footer from "@/src/components/footer";
import { RiForbid2Line } from "react-icons/ri";

export const dynamic = "force-dynamic";

export default async function ReviewDetailPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return notFound();

  const subAvg = avgFromRatings(review.ratings);
  const finalAvg = typeof review.rating === "number" ? review.rating : subAvg ?? 0;

  // Partes de la meta
  const locationText =
    review.location ?? [review.province, review.city].filter(Boolean).join(", ");
  const dateText = review.createdAt ? formatDate(review.createdAt) : null;

  const related = (await getLatestReviews(6)).filter((r) => r.id !== review.id);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 space-y-6">
      {/* Volver */}
      <nav>
        <Link href="/reviews" className="text-sm text-brown underline">
          ← Volver
        </Link>
      </nav>

      {/* 1) Título */}
      <h1 className="text-3xl font-bold text-brown">{review.title}</h1>

      {/* 2) Imagen principal */}
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card">
        <Image
          src={review.imageSrc}
          alt={review.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 896px, 100vw"
        />
      </figure>

      {/* 3) Meta row: avatar + usuario · categoría · ubicación · fecha */}
      <section className="space-y-1 text-sm text-foreground/80">
        {/* línea 1: avatar + username */}
        <div className="flex items-center gap-2">
          {review.userAvatarSrc ? (
            <Avatar
              src={review.userAvatarSrc}
              alt={`Foto de ${review.userName}`}
              size={28}
            />
          ) : (
            <span className="inline-block h-[28px] w-[28px] rounded-full bg-border" />
          )}
          <span className="font-medium text-foreground">{review.userName}</span>
        </div>

        {/* línea 2: categoría, ubicación, fecha */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 ml-1 mt-3 ">
          {review.category && <span>{review.category}</span>}
          {review.category && (locationText || dateText) && (
            <span className="text-foreground/30">•</span>
          )}

          {locationText && <span>{locationText}</span>}
          {locationText && dateText && (
            <span className="text-foreground/30">•</span>
          )}

          {dateText && <span>{dateText}</span>}
        </div>
        {/* línea 3: Pet friendly */}
        {typeof review.petFriendly === "boolean" && (
          <div className="flex items-center gap-1 ml-1 mt-1 text-sm">
            {review.petFriendly ? (
              <span className="text-green-600 font-medium">🐾 Pet friendly</span>
            ) : (
              
              <span className="flex flex-row mt-5"><RiForbid2Line size={20} color="red"/> No admite mascotas</span>
            )}
          </div>
        )}
      </section>

      {/* 4) Valoración por categoría */}
      {review.ratings && (
        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 font-semibold text-brown">Valoración por categoría</h2>
          <ul className="space-y-2">
            {(Object.keys(review.ratings) as Array<keyof typeof review.ratings>).map((key) => {
              const val = review.ratings?.[key];
              if (typeof val !== "number") return null;
              const label =
                RATING_LABELS[key as keyof typeof RATING_LABELS] ?? String(key);
              return (
                <li key={String(key)} className="flex items-center justify-between gap-3">
                  <span className="text-foreground">{label}</span>
                  <div className="flex items-center gap-2">
                    <Stars value={val} className="text-yellow-500" />
                    <span className="text-sm text-foreground/80">({val.toFixed(1)})</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* 5) Promedio final */}
      <section className="flex items-center gap-3">
        <span className="font-semibold text-foreground">Promedio final:</span>
        <Stars value={finalAvg} className="text-yellow-500" />
        <span className="text-foreground/80">{finalAvg.toFixed(1)}</span>
      </section>

      {/* 6) Contenido */}
      {/* {Array.isArray(review.content) && review.content.length > 0 && (
        <section className="space-y-4 leading-relaxed text-foreground">
          {review.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </section>
      )} */}

      {/* 7) Galería */}
      {Array.isArray(review.gallery) && review.gallery.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-semibold text-brown">Galería</h3>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {review.gallery.map((src) => (
              <li
                key={src}
                className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card"
              >
                <Image
                  src={src}
                  alt={`Foto de ${review.title}`}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 280px, (min-width:640px) 33vw, 50vw"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 8) CTA volver */}
      <div className="pt-2">
        <Link
          href="/reviews"
          className="inline-block rounded-full bg-brown px-4 py-1.5 text-sm font-semibold text-background shadow-sm transition-colors hover:bg-accent"
        >
          Volver
        </Link>
      </div>

      {/* 9) Relacionados */}
      {related.length > 0 && (
        <section className="pt-6 border-t border-border">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            También te puede interesar
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-border bg-card p-3 transition hover:shadow"
              >
                <Link href={`/review/${r.slug ?? ""}`} className="block">
                  <div className="relative mb-2 aspect-[16/9] w-full overflow-hidden rounded-md border border-border">
                    <Image
                      src={r.imageSrc}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 448px, 100vw"
                    />
                  </div>
                  <p className="font-medium text-brown">{r.title}</p>
                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {r.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
