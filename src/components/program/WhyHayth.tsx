import { Section } from '../ui/Section'
import { StudyBuildCreate } from '../ui/EditorialMedia'
import { photos } from '../../content/editorialImages'
import { ScribbleArrow, Whisper } from '../ui/AsideNotes'
import '../ui/EditorialMedia.css'
import '../ui/AsideNotes.css'

const pillars = [
  {
    label: 'ACADEMICS',
    title: 'Learn what you are studying.',
    text: 'Subject-based O/A-Level teaching, structured learning, and examination preparation. Academics remain the priority.',
  },
  {
    label: 'INDUSTRY',
    title: 'Build what you will need.',
    text: 'Technology, AI, automation, software, and professional habits, practised alongside your subjects rather than after them.',
  },
]

export function WhyHayth() {
  return (
    <Section id="why" className="why-section">
      <div className="why-compose">
        <header className="why-copy">
          <p className="eyebrow">The Hayth Organization model</p>
          <h2 className="section-title">So what would that look like?</h2>
          <p className="section-intro">
            Two tracks. One student. You study the subjects you are actually taking, and you develop
            practical capability at the same time.
          </p>
          <div className="why-aside">
            <ScribbleArrow />
            <Whisper>Built, not just studied.</Whisper>
          </div>
        </header>
        <StudyBuildCreate
          items={[
            { ...photos.notes, label: 'STUDY' },
            { ...photos.build, label: 'BUILD' },
            { ...photos.collaborate, label: 'CREATE' },
          ]}
        />
      </div>
      <div className="card-grid two">
        {pillars.map((pillar, index) => (
          <article className="reason-card" key={pillar.label}>
            <span>
              0{index + 1} {pillar.label}
            </span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>
      <p className="callout">Two tracks. One student.</p>
    </Section>
  )
}
