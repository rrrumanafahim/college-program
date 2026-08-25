import { Section } from '../ui/Section'
import { StudyBuildCreate } from '../ui/EditorialMedia'
import { ScribbleArrow, Whisper } from '../ui/AsideNotes'
import { photos } from '../../content/editorialImages'
import '../ui/EditorialMedia.css'
import '../ui/AsideNotes.css'

const applyIf = [
  'Private O-Level or A-Level candidate',
  'Currently at a traditional college and willing to switch',
  'Serious about academic performance',
  'Willing to practise, build, and be evaluated',
]

const thisIsNot = [
  'A traditional college',
  'A replacement for Cambridge examination registration',
  'Automatic employment or income',
]

export function WhoItsFor() {
  return (
    <Section id="who" className="who-section">
      <div className="who-compose">
        <header className="who-copy">
          <p className="eyebrow">Who it's for</p>
          <h2 className="section-title">Private candidates, and students ready to switch.</h2>
          <p className="section-intro">
            A good fit if you want structure for the subjects you take, and you are prepared to
            work at both tracks.
          </p>
          <div className="why-aside">
            <ScribbleArrow />
            <Whisper>your desk, your subjects</Whisper>
          </div>
        </header>
        <StudyBuildCreate
          items={[
            { ...photos.studyTogether, label: 'STUDY' },
            { ...photos.online, label: 'BUILD' },
            { ...photos.laptop, label: 'CREATE' },
          ]}
        />
      </div>
      <div className="card-grid two">
        <article className="info-card">
          <span className="card-index">01 APPLY IF</span>
          <h3>You should apply if</h3>
          {applyIf.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </article>
        <article className="info-card">
          <span className="card-index">02 THIS IS NOT</span>
          <h3>This is not</h3>
          {thisIsNot.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </article>
      </div>
      <p className="callout">
        Already enrolled at a traditional college? You can still apply, if you are willing to
        leave that college and continue as an O/A-Level candidate with Hayth Organization.
      </p>
    </Section>
  )
}
