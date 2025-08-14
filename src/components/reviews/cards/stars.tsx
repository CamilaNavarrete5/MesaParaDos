type StarsProps = { value: number; size?: number };

export default function Stars({ value, size = 18 }: StarsProps) {
  const v = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className="flex items-center gap-1" aria-label={`${v} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < v;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={filled ? "fill-[#dbe03bf3]" : "fill-[#B5C18E]"}
            role="img"
            aria-hidden="true"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.167L12 18.896l-7.336 3.868 1.402-8.167L.132 9.21l8.2-1.192L12 .587z"/>
          </svg>
        );
      })}
      <span className="sr-only">{v} de 5</span>
    </div>
  );
}
