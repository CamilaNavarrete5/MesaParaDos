// src/lib/reviews.ts
import { Review } from "@/src/types/review";


// generar pagina por Id
const BASE = "http://localhost:3001";
export async function getReviewById(id: string | number): Promise<Review | null> {
  const res = await fetch(`${BASE}/reviews/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Error al cargar la reseña");
  return res.json();
}

// Trae las últimas N reseñas, ordenadas por fecha descendente
export async function getLatestReviews(limit = 10): Promise<Review[]> {
  const url = `http://localhost:3001/reviews?_sort=createdAt&_order=desc&_limit=${limit}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar las reseñas");
  return res.json();
}

// Si querés reutilizar también lista completa:
export async function getAllReviews(): Promise<Review[]> {
  const res = await fetch("http://localhost:3001/reviews", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar las reseñas");
  return res.json();
}
