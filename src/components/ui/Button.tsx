import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ghost' | 'text'

type Shared = {
  children: ReactNode
  variant?: Variant
  className?: string
  onClick?: () => void
}

type ButtonAsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children' | 'className'> & {
    href?: undefined
    to?: undefined
  }

type ButtonAsAnchor = Shared & {
  href: string
  to?: undefined
}

type ButtonAsLink = Shared & {
  to: string
  href?: undefined
}

type Props = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

export function Button(props: Props) {
  const { children, variant = 'primary', className = '', onClick } = props
  const classes = `btn btn-${variant} ${className}`.trim()

  if ('to' in props && props.to) {
    return (
      <Link className={classes} to={props.to} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href } = props
    const isHash = href.startsWith('#') || href.startsWith('/#')
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        {...(isHash ? {} : { rel: 'noopener noreferrer' })}
        {...(isExternal ? { target: '_blank' } : {})}
      >
        {children}
      </a>
    )
  }

  const { type = 'button', disabled } = props as ButtonAsButton
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
