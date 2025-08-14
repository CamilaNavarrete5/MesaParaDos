import { getLatestReviews } from "@/src/lib/reviews";
import ReviewsCarousel from "../components/home/ReviewsCarousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latest = await getLatestReviews(10);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Mesa para Dos</h1>

      <ReviewsCarousel items={latest} title="Últimas 10 reseñas" />

     
    </main>
  );
}
