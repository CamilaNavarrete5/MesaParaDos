

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center space-y-4">
      <h1 className="text-2xl font-bold">Pagina no encontrada</h1>
      <Link href="/" className="underline">Volver a Home</Link>
    </main>
  );
}
