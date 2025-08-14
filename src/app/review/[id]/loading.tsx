export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-4">
      <div className="h-7 w-2/3 bg-gray-200 animate-pulse rounded" />
      <div className="h-[360px] w-full bg-gray-200 animate-pulse rounded-2xl" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
      </div>
    </main>
  );
}
