// src/components/ui/Stars.tsx
import { useId } from "react";

type Props = {
  value?: number;
  outOf?: number;
  /** Tamaño en px para ancho/alto de cada estrella */
  size?: number;
  /** Clases para color/espaciado. Ej: "text-yellow-500" */
  className?: string;
};

export default function Stars({
  value = 0,
  outOf = 5,
  size = 16,
  className = "", // <- sin color por defecto
}: Props) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const total = outOf;
  const gradId = useId(); // gradiente único

  const Star = ({ filled }: { filled: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="inline-block align-middle"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.45L12 18.9 6.2 21.36l1.1-6.45-4.7-4.58 6.5-.95L12 3.5z" />
    </svg>
  );

  const Half = () => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="inline-block align-middle"
    >
      <defs>
        <linearGradient id={gradId}>
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.45L12 18.9 6.2 21.36l1.1-6.45-4.7-4.58 6.5-.95L12 3.5z"
        fill={`url(#${gradId})`}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );

  return (
    <span className={className}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} filled />
      ))}
      {hasHalf && <Half />}
      {Array.from({ length: total - full - (hasHalf ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} filled={false} />
      ))}
    </span>
  );
}
