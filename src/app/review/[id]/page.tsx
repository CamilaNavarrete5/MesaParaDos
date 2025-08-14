import Image from "next/image";
import Link from "next/link";
import Stars from "@/src/components/reviews/cards/stars";
import { notFound } from "next/navigation";

import { getReviewById, getLatestReviews } from "@/src/lib/reviews";
import { avgFromRatings, formatDate, RATING_LABELS } from "@/src/lib/review-helpers";

type Params = { id: string };
export const dynamic = "force-dynamic";

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params; // ✅ Esperar la Promise para evitar el warning
  const review = await getReviewById(id);
  if (!review) return notFound();

  const subAvg = avgFromRatings(review.ratings);
  const finalAvg = typeof review.rating === "number" ? review.rating : subAvg ?? 0;

  const metaLine = [
    review.location,
    review.category,
    review.createdAt ? formatDate(review.createdAt) : null,
    review.userName,
  ]
    .filter(Boolean)
    .join(" • ");

  const related = (await getLatestReviews(6)).filter((r) => r.id !== review.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {/* ← Volver */}
      <nav>
        <Link href="/reviews" className="text-sm underline">
          ← Volver
        </Link>
      </nav>

      {/* Título + meta */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-[#914F1E]">{review.title}</h1>
        {metaLine && <p className="text-sm text-[#914F1E]/70">{metaLine}</p>}
      </header>

      {/* Imagen principal 16:9 */}
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#DEAC80]">
        <Image
          src={review.imageSrc}
          alt={review.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 768px, 100vw"
        />
      </figure>

      {/* Panel: Valoración por categoría */}
      {review.ratings && (
        <section className="rounded-2xl border border-[#DEAC80] bg-[#FBF3D5] p-4">
          <h2 className="mb-3 font-semibold text-[#914F1E]">
            Valoración por categoría
          </h2>
          <ul className="space-y-2">
            {(Object.keys(review.ratings) as Array<keyof typeof review.ratings>).map(
              (key) => {
                const val = review.ratings?.[key];
                if (typeof val !== "number") return null;
                const label =
                  RATING_LABELS[key as keyof typeof RATING_LABELS] ?? key;
                return (
                  <li
                    key={String(key)}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-[#914F1E]">{label}</span>
                    <div className="flex items-center gap-2">
                      <Stars value={val} />
                      <span className="text-sm text-[#914F1E]/80">
                        ({val.toFixed(1)})
                      </span>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </section>
      )}

      {/* Promedio final */}
      <section className="flex items-center gap-3">
        <span className="font-semibold text-[#914F1E]">Promedio final:</span>
        <Stars value={finalAvg} />
        <span className="text-[#914F1E]/80">{finalAvg.toFixed(1)}</span>
      </section>

      {/* Texto de la reseña */}
      {Array.isArray(review.content) && review.content.length > 0 && (
        <section className="space-y-4 leading-relaxed text-[#4a2c17]">
          {review.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </section>
      )}

      {/* Galería de fotos miniaturas */}
      {Array.isArray(review.gallery) && review.gallery.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-semibold text-[#914F1E]">Galería</h3>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {review.gallery.map((src, idx) => (
              <li
                key={idx}
                className="relative aspect-square overflow-hidden rounded-lg border border-[#DEAC80]"
              >
                <Image
                  src={src}
                  alt={`Foto ${idx + 1} de ${review.title}`}
                  fill
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Botón Volver */}
      <div className="pt-2">
        <Link
          href="/reviews"
          className="inline-block rounded-full bg-[#914F1E] px-4 py-1.5 text-sm font-semibold text-[#f5ede8] shadow-sm hover:bg-[#c59b79] transition-colors"
        >
          Volver
        </Link>
      </div>

      
      {related.length > 0 && (
        <section className="pt-6 border-t">
          <h2 className="text-lg font-semibold mb-3">
            También te puede interesar
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <li
                key={r.id}
                className="border rounded-lg p-3 hover:shadow transition"
              >
                <Link href={`/review/${r.id}`} className="block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md mb-2">
                    <Image
                      src={r.imageSrc}
                      alt={r.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium text-[#914F1E]">{r.title}</p>
                  <p className="text-sm text-[#914F1E]/70 line-clamp-2">
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
