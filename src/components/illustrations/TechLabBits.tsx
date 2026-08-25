import './Illustrations.css'

const bits = [
  { id: 'ai', label: 'AI', x: '6%', y: '8%' },
  { id: 'software', label: 'Software', x: '78%', y: '4%' },
  { id: 'auto', label: 'Automation', x: '70%', y: '38%' },
  { id: 'web', label: 'Web', x: '8%', y: '42%' },
] as const

export function TechLabBits() {
  return (
    <div className="lab-bits" aria-hidden="true">
      {bits.map((bit) => (
        <span key={bit.id} className={`lab-bit lab-bit-${bit.id}`} style={{ left: bit.x, top: bit.y }}>
          {bit.label}
        </span>
      ))}
    </div>
  )
}
