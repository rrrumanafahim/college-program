import { useCallback, useRef, type PointerEvent } from 'react'

const cards = [
  {
    id: 'academics',
    kicker: 'Academics',
    title: 'O/A-Level support',
    body: (
      <>
        Learn your subjects with <em>structured guidance</em>.
      </>
    ),
  },
  {
    id: 'skills',
    kicker: 'Tech skills',
    title: 'AI, software & digital skills',
    body: (
      <>
        Explore technology <em>beyond the classroom</em>.
      </>
    ),
  },
  {
    id: 'projects',
    kicker: 'Projects',
    title: 'Build things that matter',
    body: (
      <>
        Turn what you learn into <em>real work</em>.
      </>
    ),
  },
  {
    id: 'next',
    kicker: 'Your next step',
    title: 'Keep learning. Keep building.',
    body: (
      <>
        Performance can open <em>new opportunities</em>.
      </>
    ),
  },
] as const

type Props = {
  reduced: boolean
}

export function HeroDossierVisual({ reduced }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (reduced) return
      const node = frameRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      node.style.setProperty('--px', x.toFixed(3))
      node.style.setProperty('--py', y.toFixed(3))
    },
    [reduced],
  )

  const onPointerLeave = useCallback(() => {
    const node = frameRef.current
    if (!node) return
    node.style.setProperty('--px', '0')
    node.style.setProperty('--py', '0')
  }, [])

  return (
    <div
      ref={frameRef}
      className="hero-visual"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <p className="sr-only">
        A student journey: O/A-Level academic support, technology skills, project work, and
        continued growth that can open new opportunities.
      </p>
      <div className="hero-collage" aria-hidden="true">
        <svg className="hero-collage-marks" viewBox="0 0 440 460" fill="none">
          <path
            className="hero-draw hero-draw-a"
            d="M118 168c38-8 72 18 96 52"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            className="hero-draw hero-draw-a"
            d="M206 214l10-2-4 10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="hero-draw hero-draw-b"
            d="M214 268c-42 28-88 38-132 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            className="hero-draw hero-draw-b"
            d="M90 292l-8-6 10-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="hero-draw hero-draw-c"
            d="M248 318c48 8 86-12 108-48"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinecap="round"
          />
          <path
            className="hero-doodle"
            d="M38 78c8-18 28-16 28 2 12-14 28-4 18 12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className="hero-doodle hero-doodle-star"
            d="M392 72l3 8 8 1-7 5 2 8-6-5-7 4 2-8-6-6 8-1z"
            fill="currentColor"
            stroke="none"
          />
          <circle className="hero-doodle" cx="368" cy="390" r="11" stroke="currentColor" strokeWidth="1.3" />
          <path
            className="hero-doodle"
            d="M362 390h12M368 384v12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        <p className="hero-sticky hero-sticky-start">your journey starts here</p>
        <p className="hero-sticky hero-sticky-note">built with students in mind</p>

        {cards.map((card) => (
          <article key={card.id} className={`hero-card hero-card-${card.id}`}>
            <p className="hero-card-kicker">{card.kicker}</p>
            <h2>{card.title}</h2>
            <p className="hero-card-body">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
