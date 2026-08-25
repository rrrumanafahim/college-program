import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './EditorialMedia.css'

function useMediaReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(reduced)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.08, rootMargin: '80px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return { ref, visible, reduced }
}

type FrameProps = {
  src: string
  alt: string
  caption?: string
  variant?: 'feature' | 'polaroid' | 'crop'
  className?: string
}

export function EditorialPhoto({
  src,
  alt,
  caption,
  variant = 'feature',
  className = '',
}: FrameProps) {
  const { ref, visible, reduced } = useMediaReveal<HTMLElement>()

  return (
    <figure
      ref={ref}
      className={`ed-photo ed-photo-${variant}${visible || reduced ? ' is-in' : ''} ${className}`.trim()}
    >
      <div className="ed-photo-frame">
        <img src={src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

type CollageItem = {
  src: string
  alt: string
  label: string
}

export function StudyBuildCreate({
  items,
  className = '',
}: {
  items: readonly [CollageItem, CollageItem, CollageItem]
  className?: string
}) {
  const { ref, visible, reduced } = useMediaReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`ed-collage${visible || reduced ? ' is-in' : ''} ${className}`.trim()}
      aria-label="Student journey collage"
    >
      {items.map((item) => (
        <figure key={item.label} className={`ed-collage-card ed-collage-${item.label.toLowerCase()}`}>
          <div className="ed-photo-frame">
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
          </div>
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
      <svg className="ed-collage-marks" viewBox="0 0 400 380" fill="none" aria-hidden="true">
        <path d="M118 92c28-6 48 10 62 28" />
        <path d="M172 114l8-2-3 9" />
        <path d="M268 248c22 14 40 16 58 6" />
        <path d="M312 72l3 8 8 1-7 5 2 8-6-5-7 4 2-8-6-6 8-1z" fill="currentColor" stroke="none" />
      </svg>
    </div>
  )
}

export function EditorialRow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`ed-row ${className}`.trim()}>{children}</div>
}
