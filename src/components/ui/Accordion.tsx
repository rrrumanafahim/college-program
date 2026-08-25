import { useEffect, useId, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Item = {
  id: string
  question: string
  answer: ReactNode
}

type Props = {
  items: Item[]
}

export function Accordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()
  const baseId = useId()

  useEffect(() => {
    if (reduced && items[0]) setOpenId(items[0].id)
  }, [items, reduced])

  return (
    <div className="accordion">
      {items.map((item) => {
        const open = openId === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-button`

        return (
          <div className={`accordion-item${open ? ' is-open' : ''}`} key={item.id}>
            <h3 className="accordion-heading">
              <button
                id={buttonId}
                className="accordion-trigger"
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span>{item.question}</span>
                <span className="accordion-icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion-panel"
              hidden={!open}
            >
              <div className="accordion-content">{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
