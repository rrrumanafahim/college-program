import type { ReactNode } from 'react'
import './Illustrations.css'

export function NoticeBoard({ children }: { children: ReactNode }) {
  return (
    <div className="notice-board">
      <p className="notice-board-label" aria-hidden="true">
        Notice board
      </p>
      {children}
    </div>
  )
}
