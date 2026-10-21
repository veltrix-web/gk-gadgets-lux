import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export default function SmartImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-8 w-8 text-zinc-300" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-100" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
