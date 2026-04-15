import { useMemo, useState } from 'react'
import { withBase } from '../lib/base'

interface MediaImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
}

export function MediaImage({
  src,
  alt,
  fallbackSrc = 'fallbacks/default.svg',
  className,
  imgClassName,
  loading = 'lazy',
}: MediaImageProps) {
  const candidates = useMemo(() => {
    const list = [src, fallbackSrc, 'fallbacks/default.svg']
      .filter(Boolean)
      .map((item) => withBase(item))

    return [...new Set(list)]
  }, [fallbackSrc, src])

  const [index, setIndex] = useState(0)

  return (
    <div className={className}>
      <img
        alt={alt}
        className={imgClassName}
        loading={loading}
        onError={() => setIndex((current) => Math.min(current + 1, candidates.length - 1))}
        src={candidates[index]}
      />
    </div>
  )
}
