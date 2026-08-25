type Props = {
  variant: 'hero' | 'program' | 'apply'
}

function Filter({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" />
    </filter>
  )
}

export function ChalkDoodles({ variant }: Props) {
  const filterId = `chalk-${variant}`
  return (
    <div className={`chalk chalk-${variant}`} aria-hidden="true">
      <svg className="chalk-svg" viewBox="0 0 400 320" fill="none">
        <defs>
          <Filter id={filterId} />
        </defs>
        {variant === 'hero' ? <HeroMarks filter={filterId} /> : null}
        {variant === 'program' ? <ProgramMarks filter={filterId} /> : null}
        {variant === 'apply' ? <ApplyMarks filter={filterId} /> : null}
      </svg>
    </div>
  )
}

function HeroMarks({ filter }: { filter: string }) {
  const f = `url(#${filter})`
  return (
    <g filter={f} strokeLinecap="round" strokeLinejoin="round">
      <path
        className="chalk-gold"
        d="M18 42c6-14 18-16 22-4 8-18 24-12 20 4 16-8 26 6 12 14 14 6 2 22-10 16 2 16-18 18-22 4-12 14-28 2-20-12-16 4-24-14-2-22Z"
        transform="translate(8 8) scale(0.55)"
      />
      <path className="chalk-cream" d="M312 28l6 16 16 2-14 10 4 16-12-10-14 8 4-16-12-12 16-2z" />
      <path className="chalk-gold" d="M348 78c8-6 18 2 12 10-8 4-16-2-12-10Z" />
      <path
        className="chalk-cream"
        d="M42 168c28 8 54-6 82 4 26 8 48 2 72 10"
        strokeWidth="2.2"
      />
      <path className="chalk-gold" d="M286 154c18 10 34 8 48-2m-8-6c8 10 6 18-2 24" />
      <path className="chalk-cream" d="M24 248c10-18 32-8 28 10 18-8 22 14 4 16-2 16-24 8-22-6-18 6-22-14-10-20Z" />
      <path className="chalk-gold" d="M360 210c0-14 18-18 22-4 4 14-8 22-18 16-8 12-24 0-4-12Z" />
      <path className="chalk-cream" d="M168 292c40 10 88 4 128-8" />
    </g>
  )
}

function ProgramMarks({ filter }: { filter: string }) {
  const f = `url(#${filter})`
  return (
    <g filter={f} strokeLinecap="round" strokeLinejoin="round">
      <path className="chalk-gold" d="M20 24l5 12 13 2-11 8 4 12-11-8-11 7 3-13-10-9 13-2z" />
      <path className="chalk-cream" d="M360 36c22 8 18 28-4 26 16 16-8 28-20 10-18 10-30-10-12-18-10-16 14-24 36-18Z" />
      <path className="chalk-gold" d="M318 88c14 6 28-2 36 10" />
      <path className="chalk-cream" d="M48 110c8-12 28-4 22 10 14-4 12 16-2 14 2 14-20 10-18-2-14 4-16-14-2-22Z" />
    </g>
  )
}

function ApplyMarks({ filter }: { filter: string }) {
  const f = `url(#${filter})`
  return (
    <g filter={f} strokeLinecap="round" strokeLinejoin="round">
      <path className="chalk-gold" d="M30 40c36 12 70-8 108 6 34 12 64 2 96 8" />
      <path className="chalk-cream" d="M348 28l7 18 18 2-15 12 5 18-15-11-16 10 5-18-14-14 18-2z" />
      <path className="chalk-gold" d="M20 92c12-4 18 10 8 16 12 2 6 18-6 12-4 12-20 2-8-8-12-2-8-18 6-20Z" />
    </g>
  )
}
