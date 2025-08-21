export function formatDateSafe(iso: string) {
  // Siempre misma locale y huso para SSR/CSR
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(iso));
}
