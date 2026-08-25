import type { ReactNode } from 'react'

type Props = {
  title: string
  updated: string
  children: ReactNode
}

export function LegalPage({ title, updated, children }: Props) {
  return (
    <article className="legal">
      <div className="container">
        <p className="eyebrow">Hayth Organization</p>
        <h1>{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
        <div className="legal-body">{children}</div>
      </div>
    </article>
  )
}
