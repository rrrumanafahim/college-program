import './Illustrations.css'

const spots = [
  { id: 'academics', href: '#curriculum', x: '14%', y: '58%', kicker: 'Academics', label: 'O/A-Level learning', hint: 'Study here →' },
  { id: 'lab', href: '#curriculum', x: '46%', y: '42%', kicker: 'Tech lab', label: 'Explore technology', hint: 'Open the lab →' },
  { id: 'build', href: '#projects', x: '74%', y: '62%', kicker: 'Build', label: 'Create projects', hint: 'See the studio →' },
] as const

type Props = { reduced: boolean }

export function CampusScene({ reduced }: Props) {
  const staticClass = reduced ? ' is-static' : ''

  return (
    <div className={`campus${staticClass}`}>
      <p className="sr-only">
        An illustrated campus: academic learning, a technology lab, and a place to build projects.
      </p>
      <svg className="campus-sky" viewBox="0 0 480 460" aria-hidden="true">
        <Cloud x={36} y={42} />
        <Cloud x={340} y={28} delay />
        <Star x={120} y={36} />
        <Star x={420} y={70} small />
        <Star x={250} y={22} small />
        <ellipse className="campus-hill" cx="240" cy="430" rx="250" ry="48" />
        <CollegeBuilding />
        <Library />
        <TechLab />
        <Studio />
        <g className="campus-props">
          <rect x="42" y="368" width="18" height="24" rx="3" fill="#c9a24a" />
          <rect x="64" y="374" width="14" height="18" rx="2" fill="#7a9bb8" />
          <circle cx="430" cy="378" r="16" fill="#8aa89a" />
          <path d="M430 362v16M422 370h16" stroke="#fff8d6" strokeWidth="2" />
          <path className="campus-plane" d="M28 210l42 10-28 8 8-18" fill="#e08a6a" />
        </g>
      </svg>
      {spots.map((spot) => (
        <a key={spot.id} className={`campus-hotspot campus-hotspot-${spot.id}`} href={spot.href} style={{ left: spot.x, top: spot.y }}>
          <span className="campus-hotspot-dot" />
          <span className="campus-hotspot-card">
            <strong>{spot.kicker}</strong>
            <span>{spot.label}</span>
            <em>{spot.hint}</em>
          </span>
        </a>
      ))}
    </div>
  )
}

function Cloud({ x, y, delay }: { x: number; y: number; delay?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`campus-cloud${delay ? ' is-late' : ''}`}>
        <ellipse cx="28" cy="16" rx="28" ry="12" />
        <ellipse cx="48" cy="18" rx="18" ry="10" />
        <ellipse cx="12" cy="18" rx="14" ry="9" />
      </g>
    </g>
  )
}

function Star({ x, y, small }: { x: number; y: number; small?: boolean }) {
  const s = small ? 0.7 : 1
  return (
    <path
      className="campus-star"
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-8l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L0 3.6-5 14.2l1.2-5.6L-8-2.2l5.6-.6Z"
    />
  )
}

function CollegeBuilding() {
  return (
    <g className="campus-college">
      <rect x="86" y="168" width="128" height="196" rx="8" fill="#fffce8" stroke="#2c281f" strokeWidth="2.2" />
      <polygon points="78,168 150,118 222,168" fill="#c9a24a" stroke="#2c281f" strokeWidth="2.2" />
      <rect x="136" y="300" width="28" height="64" rx="3" fill="#2c281f" />
      <rect className="campus-win" x="104" y="196" width="22" height="26" rx="2" />
      <rect className="campus-win" x="138" y="196" width="22" height="26" rx="2" />
      <rect className="campus-win" x="172" y="196" width="22" height="26" rx="2" />
      <rect className="campus-win" x="104" y="240" width="22" height="26" rx="2" />
      <rect className="campus-win" x="172" y="240" width="22" height="26" rx="2" />
    </g>
  )
}

function Library() {
  return (
    <g className="campus-library">
      <rect x="28" y="248" width="72" height="116" rx="7" fill="#f4ecc0" stroke="#2c281f" strokeWidth="2" />
      <rect x="40" y="268" width="14" height="78" rx="2" fill="#7a9bb8" />
      <rect x="58" y="278" width="14" height="68" rx="2" fill="#e08a6a" />
      <rect x="76" y="272" width="14" height="74" rx="2" fill="#c9a24a" />
    </g>
  )
}

function TechLab() {
  return (
    <g className="campus-lab">
      <rect x="214" y="210" width="118" height="154" rx="10" fill="#eef4f8" stroke="#2c281f" strokeWidth="2.2" />
      <rect className="campus-screen" x="232" y="232" width="82" height="52" rx="4" />
      <path className="campus-code" d="M244 248h28M244 258h40M244 268h22" />
      <rect x="248" y="300" width="50" height="8" rx="2" fill="#2c281f" opacity="0.2" />
      <circle cx="312" cy="248" r="6" fill="#8aa89a" />
    </g>
  )
}

function Studio() {
  return (
    <g className="campus-studio">
      <rect x="338" y="268" width="110" height="96" rx="8" fill="#fff6ee" stroke="#2c281f" strokeWidth="2" />
      <rect x="352" y="286" width="36" height="28" rx="3" fill="#fffce8" stroke="#c9a24a" />
      <rect x="396" y="292" width="36" height="28" rx="3" fill="#fffce8" stroke="#e08a6a" />
      <rect x="374" y="328" width="40" height="6" rx="2" fill="#2c281f" opacity="0.18" />
    </g>
  )
}
