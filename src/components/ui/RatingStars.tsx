interface RatingStarsProps {
  rating: number;
  outOf?: number;
}

export function RatingStars({ rating, outOf = 5 }: RatingStarsProps) {
  return (
    <div className="flex gap-1 text-yellow-500">
      {Array.from({ length: outOf }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
