import { Star } from 'lucide-react';

export default function StarRating({
  rating,
  size = 14,
  showValue = false,
  reviewCount,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const on = i < full || (i === full && hasHalf);
          return (
            <Star
              key={i}
              style={{ width: size, height: size }}
              className={on ? 'fill-zinc-900 text-zinc-900' : 'fill-zinc-200 text-zinc-200'}
            />
          );
        })}
      </div>
      {showValue && <span className="text-xs font-semibold text-zinc-700">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className="text-xs text-zinc-400">({reviewCount})</span>}
    </div>
  );
}
