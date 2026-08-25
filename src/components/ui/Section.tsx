import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

type Props = {
  id: string
  eyebrow?: string
  title?: ReactNode
  intro?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, intro, children, className = '' }: Props) {
  const { ref, visible, reduced } = useReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={`section${visible || reduced ? ' is-in' : ''} ${className}`.trim()}
    >
      <div className="container">
        {(eyebrow || title || intro) && (
          <header className="section-header">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section-title">{title}</h2> : null}
            {intro ? <p className="section-intro">{intro}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
