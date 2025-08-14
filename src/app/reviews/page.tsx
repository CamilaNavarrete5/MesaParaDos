import ReviewsPageClient from "@/src/components/reviews/ReviewsPageClient";
import type { Review } from "@/src/types/review";

export const dynamic = "force-dynamic";

async function getReviews(): Promise<Review[]> {
  const res = await fetch("http://localhost:3001/reviews", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar /reviews");
  return res.json();
}

export default async function ReviewPage() {
  const data = await getReviews();
  return <ReviewsPageClient reviews={data} />;
}
