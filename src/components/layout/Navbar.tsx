import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Logo } from './Logo'

const links = [
  { id: 'program', label: 'Program' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'pathway', label: 'Pathway' },
  { id: 'fees', label: 'Fees' },
  { id: 'faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const sectionHref = (id: string) => (location.pathname === '/' ? `#${id}` : `/#${id}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1025px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('nav-open', open)
    document.body.style.overflow = open ? 'hidden' : ''

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)

    return () => {
      root.classList.remove('nav-open')
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`nav-root${open ? ' is-open' : ''}`}>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo compact />

          <nav className="nav-desktop" aria-label="Primary">
            {links.map((link) => (
              <a key={link.id} href={sectionHref(link.id)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <Button to="/apply" className="nav-cta">
              Apply Now →
            </Button>
            <button
              className={`nav-toggle${open ? ' is-open' : ''}`}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="nav-bar" />
              <span className="nav-bar" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`nav-mobile${open ? ' is-open' : ''}`}
        hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          {links.map((link) => (
            <a key={link.id} href={sectionHref(link.id)} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <NavLink to="/privacy" onClick={() => setOpen(false)}>
            Privacy
          </NavLink>
        </nav>
        <div className="nav-mobile-cta">
          <Button to="/apply" onClick={() => setOpen(false)}>
            Apply Now →
          </Button>
        </div>
      </div>
    </div>
  )
}
