export function PlaceholderNote({ children }: { children: string }) {
  return (
    <span className="placeholder-note">
      <span className="placeholder-label">To be confirmed</span>
      {children}
    </span>
  )
}
