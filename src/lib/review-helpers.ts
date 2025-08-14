import { Review, ReviewRatings } from "@/src/types/review";

export function avgFromRatings(r?: ReviewRatings): number | null {
  if (!r) return null;
  const vals = [r.service, r.place, r.ambience, r.value].filter(
    (n): n is number => typeof n === "number"
  );
  if (vals.length === 0) return null;
  const sum = vals.reduce((a, b) => a + b, 0);
  return Number((sum / vals.length).toFixed(1));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString();
}

// Etiquetas para mostrar en español
export const RATING_LABELS: Record<keyof ReviewRatings, string> = {
  service: "Atención",
  place: "Lugar",
  ambience: "Ambiente",
  value: "Precio/Calidad",
};
