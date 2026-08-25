import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './Illustrations.css'

type Props = {
  step: string
  title: string
  detail: string
}

export function JourneyRibbon({ step, title, detail }: Props) {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path || reduced) return

    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const view = window.innerHeight
      const start = view * 0.85
      const progress = (start - rect.top) / (rect.height + view * 0.35)
      const value = Math.min(1, Math.max(0, progress))
      path.style.strokeDashoffset = String(1 - value)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reduced])

  return (
    <div className="journey-ribbon" ref={wrapRef} aria-hidden="true">
      <svg className="journey-path" viewBox="0 0 120 160" fill="none">
        <path
          ref={pathRef}
          d="M60 8c-28 28 28 36 0 64s28 40 0 80"
          pathLength={1}
          style={reduced ? undefined : { strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      </svg>
      <p>
        <span>{step}</span>
        <strong>{title}</strong>
        {detail}
      </p>
    </div>
  )
}
