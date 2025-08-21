// src/lib/reviews.ts
import type { Review } from "@/src/types/review";
import { slugify } from "./slug";

const API = "http://localhost:3001/reviews";

export async function getAllReviews(): Promise<Review[]> {
  const res = await fetch(API, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar /reviews");
  const data: Review[] = await res.json();
  // asegura slug (fallback)
  return data.map(r => ({ ...r, slug: r.slug ?? slugify(r.title) }));
}

export async function getLatestReviews(n: number) {
  const all = await getAllReviews();
  return all.slice(0, n);
}

export async function getReviewBySlug(slug: string) {
  const all = await getAllReviews();
  return all.find(r => (r.slug ?? slugify(r.title)) === slug) ?? null;
}
