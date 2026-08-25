import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const programLinks = [
  { id: 'program', label: 'Program' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'pathway', label: 'Pathway' },
  { id: 'fees', label: 'Fees' },
  { id: 'faq', label: 'FAQ' },
] as const

export function Footer() {
  const { pathname } = useLocation()
  const sectionHref = (id: string) => (pathname === '/' ? `#${id}` : `/#${id}`)
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Hayth Organization. Education that prepares you for the world beyond it.
          </p>
          <p>Study. Build. Prepare.</p>
        </div>

        <div>
          <p className="footer-label">Program</p>
          <ul>
            {programLinks.map((link) => (
              <li key={link.id}>
                <a href={sectionHref(link.id)}>{link.label}</a>
              </li>
            ))}
            <li>
              <Link to="/apply">Apply</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-label">Legal</p>
          <ul>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-label">Contact</p>
          <ul>
            <li>
              <a href="mailto:info@hayth-ai.com">info@hayth-ai.com</a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/hayth.ai/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram: hayth.ai
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Hayth. All rights reserved.</p>
      </div>
    </footer>
  )
}
