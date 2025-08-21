"use client";

import ReviewCard from "@/src/components/reviews/ReviewCard";
import { Review } from "@/src/types/review";
import { useRef } from "react";

type Props = {
  items: Review[];
  title?: string;
};

export default function ReviewsCarousel({ items, title = "Últimas reseñas" }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-320)}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
          >
            ◀
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
          >
            ▶
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
      >
        {items.map((r) => (
          <div key={r.id} className="snap-start shrink-0 w-[300px]">
            <ReviewCard {...r} />
          </div>
        ))}
      </div>
    </section>
  );
}
