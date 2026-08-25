import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Section } from '../ui/Section'
import { EditorialPhoto } from '../ui/EditorialMedia'
import { Whisper } from '../ui/AsideNotes'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './LearningPathway.css'
import '../ui/EditorialMedia.css'
import '../ui/AsideNotes.css'

const stages = [
  {
    id: '01',
    title: 'LEARN',
    text: 'The academic and industry tracks, running together.',
    icon: 'learn',
  },
  {
    id: '02',
    title: 'BUILD',
    text: 'Project work that makes ability visible.',
    icon: 'build',
  },
  {
    id: '03',
    title: 'PERFORM',
    text: 'Consistency, reliability, and the quality of what you ship.',
    icon: 'challenge',
  },
  {
    id: '04',
    title: 'SHORTLIST',
    text: 'Strong performance can open official opportunities inside Hayth.',
    icon: 'perform',
  },
  {
    id: '05',
    title: 'WORK',
    text: 'Selected students may take on real project work. That is earned, not automatic.',
    icon: 'advance',
  },
  {
    id: '06',
    title: 'EARN',
    text: 'Paid work, where it exists, is how earning while studying becomes possible.',
    icon: 'apply',
  },
] as const

const criteria = [
  'Technical ability',
  'Problem-solving',
  'Creativity',
  'Consistency',
  'Learning ability',
  'Teamwork',
  'Professionalism',
  'Project performance',
]

function StageIcon({ name }: { name: (typeof stages)[number]['icon'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'apply') {
    return (
      <svg {...common}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    )
  }
  if (name === 'learn') {
    return (
      <svg {...common}>
        <path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9Z" />
        <path d="M12 4v16" />
      </svg>
    )
  }
  if (name === 'build') {
    return (
      <svg {...common}>
        <path d="M8 6 3 12l5 6" />
        <path d="M16 6l5 6-5 6" />
      </svg>
    )
  }
  if (name === 'challenge') {
    return (
      <svg {...common}>
        <path d="M12 3 21 12l-9 9-9-9 9-9Z" />
        <path d="M8 12h8" />
      </svg>
    )
  }
  if (name === 'perform') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12.5 2.4 2.4 4.6-5.2" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M5 19 19 5" />
      <path d="M9 5h10v10" />
    </svg>
  )
}

export function LearningPathway() {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [line, setLine] = useState(0)
  const [active, setActive] = useState(-1)
  const [path, setPath] = useState('')
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const measure = () => {
      const bounds = wrap.getBoundingClientRect()
      const points = nodeRefs.current
        .map((node) => {
          if (!node) return null
          const rect = node.getBoundingClientRect()
          return {
            x: rect.left + rect.width / 2 - bounds.left,
            y: rect.top + rect.height / 2 - bounds.top,
          }
        })
        .filter((point): point is { x: number; y: number } => point !== null)

      if (points.length < 2) return
      const d = points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
        .join(' ')
      setPath(d)
      setSize({ w: bounds.width, h: bounds.height })
    }

    measure()
    const raf = requestAnimationFrame(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    if (reduced) {
      setLine(1)
      setActive(stages.length - 1)
      return
    }

    let frame = 0
    const update = () => {
      const vh = window.innerHeight
      const trigger = vh * 0.88
      let filled = 0

      nodeRefs.current.forEach((node) => {
        if (!node) return
        const top = node.getBoundingClientRect().top
        const local = (trigger - top) / 90
        filled += Math.max(0, Math.min(1, local))
      })

      const next = filled / stages.length
      setLine(next)
      setActive(next <= 0 ? -1 : Math.min(stages.length - 1, Math.ceil(filled) - 1))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  return (
    <Section
      id="pathway"
      className="lp-section"
      eyebrow="The pathway"
      title="And strong work should open doors."
      intro="Learn, build, perform, shortlist, work. Students who perform well can be shortlisted for official opportunities within Hayth's industries, including paid work while still studying."
    >
      <Whisper className="pathway-aside">Small steps. Big things.</Whisper>
      <EditorialPhoto
        className="lp-moment"
        src="/images/pathway-collaborate.jpg"
        alt="A small group gathered around a laptop, working through a problem together."
        variant="crop"
      />
      <div className="lp" ref={wrapRef}>
        <svg
          className="lp-svg"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
          aria-hidden="true"
        >
          {path ? (
            <>
              <path className="lp-track" d={path} />
              <path
                className="lp-draw"
                d={path}
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 - line }}
              />
            </>
          ) : null}
        </svg>

        <ol className="lp-stages">
          {stages.map((stage, index) => {
            const state =
              index < active ? 'is-complete' : index === active ? 'is-current' : 'is-upcoming'
            return (
              <li key={stage.id} className={`lp-stage ${state}`}>
                <span
                  className="lp-node"
                  ref={(node) => {
                    nodeRefs.current[index] = node
                  }}
                />
                <article className="lp-card">
                  <div className="lp-card-top">
                    <span className="lp-num">{stage.id}</span>
                    <span className="lp-icon">
                      <StageIcon name={stage.icon} />
                    </span>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
      <ul className="criteria lp-criteria">
        {criteria.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  )
}
