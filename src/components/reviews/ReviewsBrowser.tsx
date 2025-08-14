"use client";

import { useState, useMemo } from "react";
import { Review } from "@/src/types/review";
import ReviewCard from "@/src/components/reviews/cards/ReviewCard";

type Props = {
  reviews: Review[];
};

export default function ReviewsBrowser({ reviews }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category ? r.category === category : true;
      const matchLocation = location ? r.location === location : true;

      return matchSearch && matchCategory && matchLocation;
    });
  }, [reviews, search, category, location]);

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar reseña..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-md border p-2"
      />


      {/* Listado filtrado */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))
        ) : (
          <p className="text-gray-500">No se encontraron resultados.</p>
        )}
      </section>
    </div>
  );
}
