import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useReveal<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, reduced])

  return { ref, visible, reduced }
}
