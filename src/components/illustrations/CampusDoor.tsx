import './Illustrations.css'

export function CampusDoor() {
  return (
    <svg className="campus-door" viewBox="0 0 160 200" aria-hidden="true">
      <rect x="18" y="18" width="124" height="168" rx="8" fill="#fffce8" stroke="#2c281f" strokeWidth="2.4" />
      <rect x="32" y="34" width="96" height="138" rx="6" fill="#c9a24a" />
      <rect className="campus-door-panel" x="44" y="48" width="72" height="50" rx="4" />
      <rect className="campus-door-panel" x="44" y="108" width="72" height="50" rx="4" />
      <circle cx="104" cy="118" r="6" fill="#2c281f" />
      <path d="M80 8v12" stroke="#2c281f" strokeWidth="2" />
    </svg>
  )
}
