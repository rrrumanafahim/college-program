import { useLayoutEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './StudentJourney.css'

const WORLD_W = 3600
const WORLD_H = 2800

const PATH_D = [
  'M 300 2520',
  'C 860 2520 1320 2380 1560 2100',
  'C 1860 1740 2080 1480 2480 1280',
  'C 2920 1060 3280 860 3380 560',
  'C 3480 280 3180 140 2780 160',
  'C 2280 180 1860 320 1480 280',
  'C 1040 230 640 140 420 200',
].join(' ')

const STOPS = [
  {
    id: 'education',
    n: '01',
    nav: 'Education',
    title: 'Education',
    lead: 'Build your academic foundation.',
    copy: 'Receive support alongside your O/A-Level studies.',
    t: 0.02,
  },
  {
    id: 'tech',
    n: '02',
    nav: 'Professional Training',
    title: 'Professional Training',
    lead: 'Explore skills beyond the classroom.',
    copy: 'Learn about technology, software, automation and digital problem-solving, and start using those skills while you are still studying.',
    t: 0.24,
  },
  {
    id: 'build',
    n: '03',
    nav: 'Build',
    title: 'Build',
    lead: 'Put your knowledge into practice.',
    copy: 'Work on challenges, projects and practical experiences.',
    t: 0.48,
  },
  {
    id: 'grow',
    n: '04',
    nav: 'Grow',
    title: 'Grow',
    lead: 'Develop professionally and personally.',
    copy: 'Build problem-solving skills, consistency, communication and independence.',
    t: 0.72,
  },
  {
    id: 'opportunities',
    n: '05',
    nav: 'Opportunities',
    title: 'Opportunities',
    lead: 'Work while you train.',
    copy: 'High-performing students may gradually receive opportunities to contribute to appropriate real projects alongside their studies, including potential opportunities with Hayth Tech, depending on their skills, performance and available opportunities. That work can begin during the program, while students are still training.',
    t: 0.96,
  },
] as const

function wrapDeg(deg: number) {
  return ((((deg + 180) % 360) + 360) % 360) - 180
}

function nearestStop(progress: number) {
  let best = 0
  let dist = Infinity
  STOPS.forEach((stop, i) => {
    const d = Math.abs(progress - stop.t)
    if (d < dist) {
      dist = d
      best = i
    }
  })
  return best
}

function StageLandmark({ kind }: { kind: (typeof STOPS)[number]['id'] }) {
  if (kind === 'education') {
    return (
      <svg viewBox="0 0 280 200" aria-hidden="true">
        <rect x="48" y="88" width="184" height="92" fill="#fffef6" stroke="#2c281f" strokeWidth="2" />
        <path d="M36 88 H244 L140 28 Z" fill="#f3e4a8" stroke="#2c281f" strokeWidth="2" />
        <rect x="124" y="36" width="32" height="22" fill="#fff8d6" stroke="#74591c" strokeWidth="1.6" />
        <rect x="118" y="128" width="44" height="52" fill="#e8d48a" stroke="#2c281f" strokeWidth="1.7" />
        <rect x="64" y="108" width="28" height="36" fill="#fff8d6" stroke="#c9a24a" strokeWidth="1.5" />
        <rect x="188" y="108" width="28" height="36" fill="#fff8d6" stroke="#c9a24a" strokeWidth="1.5" />
        <path d="M72 108v36M80 108v36M200 108v36M208 108v36" stroke="#74591c" strokeWidth="1.2" />
        <rect x="40" y="180" width="200" height="8" fill="#c9a24a" />
        <rect x="56" y="172" width="168" height="8" fill="#e8d48a" />
        <rect x="18" y="148" width="22" height="32" fill="#fbf4e3" stroke="#2c281f" strokeWidth="1.4" />
        <path d="M16 148h26l-4-18-18 6z" fill="#c9a24a" />
      </svg>
    )
  }
  if (kind === 'tech') {
    return (
      <svg viewBox="0 0 280 200" aria-hidden="true">
        <rect x="28" y="118" width="224" height="14" rx="3" fill="#2c281f" />
        <rect x="48" y="42" width="184" height="80" rx="8" fill="#2c281f" />
        <rect x="58" y="52" width="164" height="54" fill="#fff8d6" />
        <path d="M70 66h48M70 78h72M70 90h36" stroke="#74591c" strokeWidth="3" />
        <rect x="168" y="64" width="40" height="28" rx="3" fill="#c9a24a" opacity="0.45" />
        <rect x="86" y="132" width="108" height="10" rx="2" fill="#c9a24a" />
        <rect x="36" y="152" width="72" height="36" rx="6" fill="#fffef6" stroke="#2c281f" strokeWidth="1.6" />
        <path d="M48 164h48M48 174h32" stroke="#c9a24a" strokeWidth="2" />
        <circle cx="232" cy="160" r="18" fill="none" stroke="#74591c" strokeWidth="2" />
        <path d="M232 148v12h10" stroke="#c9a24a" strokeWidth="2" fill="none" />
      </svg>
    )
  }
  if (kind === 'build') {
    return (
      <svg viewBox="0 0 280 200" aria-hidden="true">
        <rect x="24" y="36" width="132" height="148" rx="8" fill="#fffef6" stroke="#2c281f" strokeWidth="2" />
        <rect x="36" y="52" width="48" height="36" rx="4" fill="#f3e4a8" />
        <rect x="92" y="52" width="48" height="36" rx="4" fill="#e08a6a" opacity="0.45" />
        <rect x="36" y="98" width="48" height="36" rx="4" fill="#8aa89a" opacity="0.4" />
        <rect x="92" y="98" width="48" height="36" rx="4" fill="#c9a24a" opacity="0.35" />
        <rect x="168" y="48" width="88" height="58" rx="6" fill="#2c281f" />
        <rect x="176" y="56" width="72" height="36" fill="#fff8d6" />
        <rect x="168" y="122" width="40" height="40" rx="4" fill="#fbf4e3" stroke="#74591c" strokeWidth="1.6" />
        <circle cx="232" cy="142" r="16" fill="none" stroke="#2c281f" strokeWidth="2" />
        <path d="M232 132v20M222 142h20" stroke="#c9a24a" strokeWidth="2" />
      </svg>
    )
  }
  if (kind === 'grow') {
    return (
      <svg viewBox="0 0 280 200" aria-hidden="true">
        <path d="M36 168h48v-28H36z" fill="#e8d48a" stroke="#2c281f" strokeWidth="1.6" />
        <path d="M92 168h48v-52H92z" fill="#f3e4a8" stroke="#2c281f" strokeWidth="1.6" />
        <path d="M148 168h48v-76H148z" fill="#e8d48a" stroke="#2c281f" strokeWidth="1.6" />
        <path d="M204 168h40v-100H204z" fill="#c9a24a" opacity="0.55" stroke="#2c281f" strokeWidth="1.6" />
        <path d="M220 52 C 220 28 248 24 252 48 C 268 44 274 64 258 70 C 262 88 236 92 228 76 C 212 84 208 60 220 52 Z" fill="#8aa89a" />
        <rect x="246" y="70" width="8" height="40" fill="#74591c" />
        <circle cx="60" cy="96" r="10" fill="none" stroke="#c9a24a" strokeWidth="2" />
        <path d="M60 86v20M50 96h20" stroke="#74591c" strokeWidth="1.5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 280 200" aria-hidden="true">
      <rect x="32" y="44" width="216" height="128" rx="10" fill="#fffef6" stroke="#2c281f" strokeWidth="2" />
      <rect x="32" y="44" width="216" height="28" rx="10" fill="#2c281f" />
      <rect x="32" y="60" width="216" height="12" fill="#2c281f" />
      <text x="48" y="64" fill="#fff8d6" fontSize="12" fontFamily="IBM Plex Mono, monospace">
        Hayth Tech
      </text>
      <rect x="48" y="92" width="72" height="52" rx="4" fill="#f3e4a8" stroke="#c9a24a" strokeWidth="1.5" />
      <rect x="132" y="92" width="96" height="18" rx="3" fill="#fff8d6" stroke="#74591c" strokeWidth="1.4" />
      <rect x="132" y="118" width="72" height="18" rx="3" fill="#fff8d6" stroke="#74591c" strokeWidth="1.4" />
      <rect x="48" y="154" width="40" height="8" rx="2" fill="#c9a24a" />
      <rect x="96" y="154" width="28" height="8" rx="2" fill="#8aa89a" />
    </svg>
  )
}

function SceneIcon({ kind }: { kind: (typeof STOPS)[number]['id'] }) {
  if (kind === 'education') {
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <rect x="8" y="28" width="44" height="36" rx="4" fill="#fbf4e3" stroke="#c9a24a" strokeWidth="2" />
        <path d="M16 28 V22 H44 V28" fill="none" stroke="#74591c" strokeWidth="2" />
        <rect x="62" y="18" width="48" height="50" rx="3" fill="#fffef6" stroke="#2c281f" strokeWidth="1.6" />
        <path d="M70 30h32M70 40h32M70 50h22" stroke="#c9a24a" strokeWidth="2" />
      </svg>
    )
  }
  if (kind === 'tech') {
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <rect x="18" y="12" width="84" height="50" rx="6" fill="#2c281f" />
        <rect x="26" y="20" width="68" height="34" rx="2" fill="#fff8d6" />
        <path d="M34 30h20M34 38h28M34 46h16" stroke="#74591c" strokeWidth="2" />
        <rect x="40" y="64" width="40" height="6" rx="2" fill="#c9a24a" />
      </svg>
    )
  }
  if (kind === 'build') {
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <rect x="10" y="16" width="38" height="48" rx="4" fill="#f3e4a8" stroke="#2c281f" strokeWidth="1.6" />
        <rect x="56" y="10" width="54" height="36" rx="4" fill="#fffef6" stroke="#c9a24a" strokeWidth="2" />
        <rect x="64" y="52" width="38" height="18" rx="3" fill="#e08a6a" opacity="0.55" />
        <circle cx="29" cy="40" r="8" fill="none" stroke="#74591c" strokeWidth="2" />
      </svg>
    )
  }
  if (kind === 'grow') {
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <path d="M20 68h16v-14H20zM42 68h16V40H42zM64 68h16V28H64zM86 68h16V18H86z" fill="#c9a24a" opacity="0.35" />
        <path d="M28 54v14M50 40v28M72 28v40M94 18v50" stroke="#74591c" strokeWidth="2" />
        <circle cx="94" cy="16" r="6" fill="#8aa89a" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <rect x="14" y="22" width="92" height="42" rx="6" fill="#fffef6" stroke="#2c281f" strokeWidth="1.7" />
      <rect x="22" y="30" width="28" height="18" rx="2" fill="#c9a24a" opacity="0.45" />
      <path d="M58 34h40M58 44h28" stroke="#74591c" strokeWidth="2" />
      <text x="22" y="58" fontSize="9" fill="#2c281f" fontFamily="IBM Plex Mono, monospace">
        Hayth Tech
      </text>
    </svg>
  )
}

export function StudentJourney() {
  const reduced = usePrefersReducedMotion()
  const pinRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const travelledRef = useRef<SVGPathElement>(null)
  const riderRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (reduced) return
    const pin = pinRef.current
    const world = worldRef.current
    const path = pathRef.current
    const travelled = travelledRef.current
    if (!pin || !world || !path) return

    let frame = 0
    let lastActive = -1

    const apply = () => {
      const length = path.getTotalLength()
      if (!length) return

      const rect = pin.getBoundingClientRect()
      const travel = Math.max(1, pin.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / travel))

      const at = progress * length
      const pt = path.getPointAtLength(at)
      const ahead = path.getPointAtLength(Math.min(length, at + 18))
      const tangent = Math.atan2(ahead.y - pt.y, ahead.x - pt.x)
      const heading = wrapDeg((tangent * 180) / Math.PI + 90)
      const rotate = Math.max(-9, Math.min(9, heading * 0.12))

      const vw = window.innerWidth
      const vh = window.innerHeight
      const visible = vw < 720 ? 1180 : vw < 1100 ? 1000 : 840
      const scale = Math.min(vw, vh) / visible

      world.style.transform = [
        `translate(${vw / 2}px, ${vh * 0.5}px)`,
        `rotate(${rotate}deg)`,
        `scale(${scale})`,
        `translate(${-pt.x}px, ${-pt.y}px)`,
      ].join(' ')

      if (travelled) {
        travelled.style.strokeDasharray = `${length}`
        travelled.style.strokeDashoffset = `${Math.max(0, length - at)}`
      }

      if (riderRef.current) {
        riderRef.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`
      }

      world.querySelectorAll<HTMLElement>('.journey-stop').forEach((el, i) => {
        const stopT = STOPS[i].t
        const sp = path.getPointAtLength(stopT * length)
        el.style.left = `${sp.x}px`
        el.style.top = `${sp.y}px`
      })

      world.querySelectorAll<HTMLElement>('.journey-landmark').forEach((el, i) => {
        const stopT = STOPS[i].t
        const sp = path.getPointAtLength(stopT * length)
        el.style.left = `${sp.x}px`
        el.style.top = `${sp.y}px`
      })

      const idx = nearestStop(progress)
      if (idx !== lastActive) {
        lastActive = idx
        setActive(idx)
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        apply()
      })
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduced])

  const goTo = (t: number) => {
    const pin = pinRef.current
    if (!pin) return
    const start = window.scrollY + pin.getBoundingClientRect().top
    const travel = Math.max(1, pin.offsetHeight - window.innerHeight)
    window.scrollTo({ top: start + travel * t, behavior: reduced ? 'auto' : 'smooth' })
  }

  if (reduced) {
    return (
      <section id="independence" className="journey-section">
        <div className="journey-intro">
          <p className="journey-kicker">Your unique path</p>
          <h2 className="journey-title">
            Your Journey,
            <br />
            Our Program.
          </h2>
        </div>
        <ol className="journey-static">
          {STOPS.map((stop) => (
            <li key={stop.id}>
              <p className="journey-num">{stop.n}</p>
              <h3>{stop.title}</h3>
              <p>{stop.lead}</p>
              <p>{stop.copy}</p>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section id="independence" className="journey-section">
      <div className="journey-intro">
        <p className="journey-kicker">Your unique path</p>
        <h2 className="journey-title">
          Your Journey,
          <br />
          Our Program.
        </h2>
      </div>

      <div ref={pinRef} className="journey-pin">
        <div className="journey-viewport">
          <div ref={worldRef} className="journey-world" style={{ width: WORLD_W, height: WORLD_H }}>
            <svg
              className="journey-map"
              viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
              width={WORLD_W}
              height={WORLD_H}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="roadFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8d48a" />
                  <stop offset="100%" stopColor="#c9a24a" />
                </linearGradient>
              </defs>
              <g className="journey-atlas" aria-hidden="true">
                <g stroke="#e4d4ae" strokeWidth="1" fill="none" opacity="0.55">
                  {Array.from({ length: 18 }, (_, i) => (
                    <line key={`v${i}`} x1={200 + i * 190} y1="80" x2={200 + i * 190} y2="2720" />
                  ))}
                  {Array.from({ length: 14 }, (_, i) => (
                    <line key={`h${i}`} x1="80" y1={160 + i * 190} x2="3520" y2={160 + i * 190} />
                  ))}
                </g>
                <g fill="none" stroke="#c9a24a" strokeWidth="1.35" opacity="0.42">
                  <path d="M180 2380 C 420 2320 520 2140 480 1960 C 430 1740 260 1680 220 1480" />
                  <path d="M720 2620 C 880 2480 940 2260 1120 2140 C 1320 2000 1580 2060 1760 1920" />
                  <path d="M1980 2460 C 2140 2280 2060 2040 2280 1880 C 2520 1700 2780 1760 3020 1600" />
                  <path d="M3200 1320 C 3380 1140 3460 880 3320 680 C 3180 480 2900 420 2680 360" />
                  <path d="M240 920 C 420 760 680 820 900 680 C 1160 520 1080 300 1320 200" />
                  <path d="M1680 980 C 1880 820 2140 860 2360 700 C 2580 540 2540 320 2780 240" strokeDasharray="10 12" />
                  <path d="M640 1680 C 860 1540 1100 1600 1280 1420 C 1480 1220 1400 980 1620 820" strokeDasharray="8 11" />
                  <path d="M2860 2140 C 3040 1960 3180 1720 3080 1480" strokeDasharray="7 10" />
                </g>
                <g fill="none" stroke="#74591c" strokeWidth="1.2" opacity="0.28">
                  <ellipse cx="620" cy="2280" rx="210" ry="140" />
                  <ellipse cx="1180" cy="1960" rx="160" ry="110" />
                  <ellipse cx="2100" cy="1680" rx="190" ry="120" />
                  <ellipse cx="2980" cy="980" rx="170" ry="130" />
                  <ellipse cx="1880" cy="420" rx="220" ry="130" />
                  <ellipse cx="780" cy="520" rx="150" ry="100" />
                  <ellipse cx="2520" cy="2360" rx="140" ry="90" />
                  <path d="M480 2140 C 560 2080 640 2120 700 2060 C 760 2000 820 2040 880 1980" />
                  <path d="M1720 1540 C 1820 1480 1920 1520 2020 1460 C 2120 1400 2220 1440 2320 1380" />
                </g>
                <g fill="none" stroke="#2c281f" strokeWidth="1.45" opacity="0.22">
                  <rect x="240" y="2360" width="70" height="52" rx="4" />
                  <rect x="328" y="2388" width="58" height="40" rx="4" />
                  <rect x="268" y="2428" width="86" height="48" rx="4" />
                  <rect x="980" y="2180" width="80" height="56" rx="4" />
                  <rect x="1074" y="2204" width="64" height="44" rx="4" />
                  <rect x="1012" y="2256" width="92" height="50" rx="4" />
                  <rect x="1480" y="1980" width="74" height="50" rx="4" />
                  <rect x="1568" y="2008" width="88" height="62" rx="4" />
                  <rect x="1510" y="2078" width="60" height="42" rx="4" />
                  <rect x="2320" y="1420" width="82" height="54" rx="4" />
                  <rect x="2416" y="1450" width="70" height="46" rx="4" />
                  <rect x="2350" y="1508" width="96" height="58" rx="4" />
                  <rect x="3080" y="720" width="76" height="50" rx="4" />
                  <rect x="3170" y="748" width="64" height="44" rx="4" />
                  <rect x="3108" y="804" width="90" height="52" rx="4" />
                  <rect x="1960" y="280" width="86" height="56" rx="4" />
                  <rect x="2060" y="308" width="70" height="48" rx="4" />
                  <rect x="1990" y="368" width="102" height="60" rx="4" />
                  <rect x="520" y="360" width="78" height="50" rx="4" />
                  <rect x="612" y="388" width="66" height="42" rx="4" />
                  <rect x="548" y="440" width="94" height="54" rx="4" />
                  <rect x="2680" y="1880" width="72" height="48" rx="4" />
                  <rect x="2764" y="1906" width="80" height="56" rx="4" />
                  <rect x="820" y="1120" width="68" height="46" rx="4" />
                  <rect x="900" y="1146" width="90" height="58" rx="4" />
                </g>
                <g fill="none" stroke="#c9a24a" strokeWidth="1.3" opacity="0.4">
                  <path d="M400 2480 h36 l8 22 h-52 z" />
                  <path d="M1240 2080 h40 l8 24 h-56 z" />
                  <path d="M1760 1880 h36 l8 22 h-52 z" />
                  <path d="M2560 1180 h42 l9 24 h-60 z" />
                  <path d="M3260 500 h38 l8 22 h-54 z" />
                  <path d="M1640 300 h40 l8 24 h-56 z" />
                  <path d="M700 260 h36 l8 22 h-52 z" />
                  <circle cx="560" cy="1760" r="18" />
                  <circle cx="1400" cy="1280" r="16" />
                  <circle cx="2740" cy="640" r="18" />
                  <circle cx="2140" cy="2140" r="15" />
                  <circle cx="980" cy="640" r="17" />
                  <circle cx="3180" cy="1680" r="16" />
                  <rect x="1880" y="1080" width="48" height="48" rx="6" transform="rotate(12 1904 1104)" />
                  <rect x="430" y="860" width="44" height="44" rx="6" transform="rotate(-8 452 882)" />
                  <rect x="3020" y="2100" width="46" height="46" rx="6" transform="rotate(18 3043 2123)" />
                </g>
                <g fill="#c9a24a" opacity="0.18">
                  <circle cx="500" cy="2200" r="7" />
                  <circle cx="540" cy="2236" r="5" />
                  <circle cx="1080" cy="1840" r="6" />
                  <circle cx="1124" cy="1870" r="5" />
                  <circle cx="2240" cy="1540" r="6" />
                  <circle cx="2280" cy="1572" r="5" />
                  <circle cx="2900" cy="820" r="7" />
                  <circle cx="2940" cy="850" r="5" />
                  <circle cx="1700" cy="520" r="6" />
                  <circle cx="1744" cy="548" r="5" />
                  <circle cx="860" cy="400" r="6" />
                  <circle cx="3200" cy="1200" r="6" />
                  <circle cx="2400" cy="400" r="5" />
                  <circle cx="360" cy="1280" r="6" />
                  <circle cx="1500" cy="2400" r="6" />
                </g>
                <g fill="none" stroke="#74591c" strokeWidth="1.4" opacity="0.35">
                  <circle cx="3380" cy="240" r="46" />
                  <circle cx="3380" cy="240" r="8" />
                  <path d="M3380 194 V214 M3380 266 V286 M3334 240 H3354 M3406 240 H3426" />
                  <path d="M3380 240 L3380 204 L3394 240 Z" fill="#c9a24a" stroke="none" opacity="0.55" />
                </g>
                <g fill="none" stroke="#8aa89a" strokeWidth="1.25" opacity="0.38">
                  <path d="M760 2360 C 820 2320 880 2380 940 2340 C 1000 2300 1060 2360 1120 2320" />
                  <path d="M2040 760 C 2100 720 2160 780 2220 740 C 2280 700 2340 760 2400 720" />
                  <path d="M300 640 C 360 600 420 660 480 620 C 540 580 600 640 660 600" />
                  <path d="M2480 2000 C 2540 1960 2600 2020 2660 1980" />
                </g>
              </g>
              <path
                d={PATH_D}
                fill="none"
                stroke="#f3e4a8"
                strokeWidth="92"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={PATH_D}
                fill="none"
                stroke="url(#roadFill)"
                strokeWidth="56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="#fffef6"
                strokeWidth="8"
                strokeDasharray="18 22"
                strokeLinecap="round"
              />
              <path
                ref={travelledRef}
                d={PATH_D}
                fill="none"
                stroke="#74591c"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <div ref={riderRef} className="journey-rider" aria-hidden="true" />

            {STOPS.map((stop, i) => (
              <div
                key={`${stop.id}-land`}
                className={`journey-landmark${i === active ? ' is-here' : i < active ? ' is-past' : ''}`}
                aria-hidden="true"
              >
                <StageLandmark kind={stop.id} />
              </div>
            ))}

            {STOPS.map((stop, i) => (
              <article
                key={stop.id}
                className={`journey-stop${i === active ? ' is-here' : i < active ? ' is-past' : ''}`}
              >
                <div className="journey-stop-art">
                  <SceneIcon kind={stop.id} />
                </div>
                <p className="journey-num">{stop.n}</p>
                <h3>{stop.title}</h3>
                <p className="journey-lead">{stop.lead}</p>
                <p className="journey-copy">{stop.copy}</p>
              </article>
            ))}
          </div>

          <nav className="journey-nav" aria-label="Journey stages">
            {STOPS.map((stop, i) => (
              <button
                key={stop.id}
                type="button"
                className={i === active ? 'is-active' : i < active ? 'is-done' : ''}
                onClick={() => goTo(stop.t)}
              >
                <span>{stop.n}</span>
                {stop.nav}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
