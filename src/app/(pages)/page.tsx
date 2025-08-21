import { getLatestReviews } from "@/src/lib/reviews";
import ReviewsCarousel from "../../components/home/ReviewsCarousel";
import { NavBar } from "../../components/navbar";
import Footer from "../../components/footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latest = await getLatestReviews(10);

  return (
    <main className="w-full px-4 lg:px-8 space-y-8">

      <h1 className="text-3xl font-bold">Mesa para Dos</h1>

      <ReviewsCarousel items={latest} title="Últimas 10 reseñas" />

    </main>
  );
}
