import { Button } from '../ui/Button'
import { CampusDoor } from '../illustrations/CampusDoor'
import { Whisper } from '../ui/AsideNotes'
import '../ui/AsideNotes.css'
import '../illustrations/Illustrations.css'

export function ApplyCTA() {
  return (
    <section id="apply" className="apply is-campus">
      <div className="container apply-inner">
        <div>
          <p className="eyebrow">Apply</p>
          <h2>Ready to build your education differently?</h2>
          <p className="section-intro">Apply to Hayth Organization.</p>
          <p className="section-intro">Your seat is waiting.</p>
          <Whisper className="apply-whisper">Start somewhere →</Whisper>
        </div>
        <CampusDoor />
        <div>
          <Button to="/apply">Apply Now →</Button>
        </div>
      </div>
    </section>
  )
}
