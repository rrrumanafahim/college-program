import { Link } from 'react-router-dom'

type Props = {
  compact?: boolean
}

export function Logo({ compact = false }: Props) {
  return (
    <Link className={`logo${compact ? ' is-compact' : ''}`} to="/" aria-label="Hayth Organization home">
      <img className="logo-mark-img" src="/hayth-logo.png" alt="" width={56} height={56} />
      <span className="logo-text">
        Hayth <span>Organization</span>
      </span>
    </Link>
  )
}
