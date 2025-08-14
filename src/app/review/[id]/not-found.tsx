import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center space-y-4">
      <h1 className="text-2xl font-bold">Reseña no encontrada</h1>
      <p className="text-gray-600">La reseña que buscás no existe o fue borrada.</p>
      <Link href="/reviews" className="underline">Volver a Reseñas</Link>
    </main>
  );
}
