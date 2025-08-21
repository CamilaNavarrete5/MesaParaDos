// src/components/reviews/ReviewsBrowser.tsx
"use client";

import { useEffect, useState } from "react";
import { Review } from "@/src/types/review";
import ReviewCard from "@/src/components/reviews/ReviewCard";

type Props = { reviews: Review[] };

export default function ReviewsBrowser({ reviews }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-[420px] rounded-xl border border-border bg-card shadow-sm" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} {...review} variant="compact" />)
      ) : (
        <p className="text-gray-500">No se encontraron resultados.</p>
      )}
    </section>
  );
}
