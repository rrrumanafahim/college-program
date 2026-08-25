import { ChalkDoodles } from '../ui/ChalkDoodles'
import { Button } from '../ui/Button'
import { Whisper } from '../ui/AsideNotes'
import { CampusScene } from '../illustrations/CampusScene'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import '../ui/ChalkDoodles.css'
import '../ui/AsideNotes.css'
import '../illustrations/Illustrations.css'
import './Hero.css'

export function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className={`hero${reduced ? ' is-static' : ''}`} id="top">
      <div className="container hero-grid-layout">
        <div className="hero-copy">
          <ChalkDoodles variant="hero" />
          <p className="eyebrow hero-enter hero-enter-kicker">
            Hayth Organization · O/A-Level Education
          </p>
          <h1 className="hero-title hero-enter hero-enter-title">
            Your Education.
            <br />
            Your Skills.
            <br />
            <span className="hero-highlight">Your Future.</span>
          </h1>
          <p className="hero-lead hero-enter hero-enter-lead">
            Subject-based academic education for private O/A-Level candidates, combined with
            practical technology development.
          </p>
          <div className="hero-actions hero-enter hero-enter-actions">
            <Button to="/apply">Apply for the Program →</Button>
            <Button href="#program" variant="ghost">
              Explore the Program ↓
            </Button>
          </div>
          <p className="hero-signal hero-enter hero-enter-signal">
            <span>Study</span>
            <span aria-hidden="true">→</span>
            <span>Build</span>
            <span aria-hidden="true">→</span>
            <span>Prove</span>
          </p>
          <Whisper className="hero-whisper">Curious is a good place to start.</Whisper>
        </div>
        <CampusScene reduced={reduced} />
      </div>
    </section>
  )
}
