// src/components/ui/Stars.tsx
export default function Stars({ value = 0, outOf = 5 }: { value?: number; outOf?: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const total = outOf;

  const Star = ({ filled }: { filled: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className="inline-block"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.45L12 18.9 6.2 21.36l1.1-6.45-4.7-4.58 6.5-.95L12 3.5z" />
    </svg>
  );

  const Half = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" className="inline-block">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.45L12 18.9 6.2 21.36l1.1-6.45-4.7-4.58 6.5-.95L12 3.5z"
        fill="url(#half)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );

  return (
    <span className="text-primary">
      {Array.from({ length: full }).map((_, i) => <Star key={`f-${i}`} filled />)}
      {hasHalf && <Half />}
      {Array.from({ length: total - full - (hasHalf ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} filled={false} />
      ))}
    </span>
  );
}
