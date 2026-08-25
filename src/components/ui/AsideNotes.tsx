import type { ReactNode } from 'react'
import './AsideNotes.css'

type WhisperProps = {
  children: ReactNode
  className?: string
}

export function Whisper({ children, className = '' }: WhisperProps) {
  return (
    <p className={`whisper ${className}`.trim()} aria-hidden="true">
      {children}
    </p>
  )
}

export function MiniSticky({ children, className = '' }: WhisperProps) {
  return (
    <p className={`mini-sticky ${className}`.trim()} aria-hidden="true">
      {children}
    </p>
  )
}

export function HighlightWord({ children }: { children: ReactNode }) {
  return <em className="note-hl">{children}</em>
}

export function CircledWord({ children }: { children: ReactNode }) {
  return (
    <span className="word-circle">
      {children}
      <svg className="word-circle-mark" viewBox="0 0 88 36" aria-hidden="true">
        <ellipse cx="44" cy="18" rx="40" ry="13.5" />
      </svg>
    </span>
  )
}

export function ScribbleArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`scribble-arrow ${className}`.trim()} viewBox="0 0 72 28" aria-hidden="true">
      <path d="M4 16c18-10 34-10 50 1" />
      <path d="M46 8l14 9-16 3" />
    </svg>
  )
}
