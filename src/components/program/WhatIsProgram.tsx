import { ChalkDoodles } from '../ui/ChalkDoodles'
import { EditorialPhoto, EditorialRow } from '../ui/EditorialMedia'
import { Section } from '../ui/Section'
import { photos } from '../../content/editorialImages'
import { MiniSticky, HighlightWord } from '../ui/AsideNotes'
import '../ui/ChalkDoodles.css'
import '../ui/AsideNotes.css'
import '../ui/EditorialMedia.css'

const traditional = ['Study', 'Exams', 'University', 'Graduate', 'Learn practical skills']
const hayth = ['Study', 'Build', 'Experience', 'Develop', 'Be ready earlier']

export function WhatIsProgram() {
  return (
    <Section
      id="program"
      className="program-section"
      eyebrow="Education, rethought"
      title={
        <>
          Why wait until graduation to start preparing for the{' '}
          <HighlightWord>real world</HighlightWord>?
        </>
      }
    >
      <ChalkDoodles variant="program" />
      <EditorialRow className="program-story">
        <div className="program-lead">
          <p>
            Education can be expensive, and quality is often concentrated around traditional
            institutions. Academic learning and practical preparation are frequently treated as two
            separate stages of life. Students may spend years working toward exams and degrees, only
            then discovering how much of the workplace still has to be learned independently.
          </p>
          <p>
            Traditional education has an important role. It does not always provide enough practical
            preparation for the world students eventually enter. Education needs to do more.
          </p>
          <p className="program-emphasis">
            Modern technology is the future of that world. That is why this program trains students
            in practical tech while they are still studying, so they are not catching up after
            graduation.
          </p>
        </div>
        <EditorialPhoto
          src={photos.studyTogether.src}
          alt={photos.studyTogether.alt}
          variant="feature"
        />
      </EditorialRow>

      <div className="card-grid two">
        <article className="info-card">
          <span className="card-index">01 TRADITIONAL PATH</span>
          <h3>Study first. Prepare later.</h3>
          <ol className="progress-stack">
            {traditional.map((step, index) => (
              <li key={step}>
                <span>{step}</span>
                {index < traditional.length - 1 ? <b aria-hidden="true">→</b> : null}
              </li>
            ))}
          </ol>
        </article>
        <article className="info-card">
          <span className="card-index">02 HAYTH ORGANIZATION</span>
          <h3>Study and prepare together.</h3>
          <ol className="progress-stack">
            {hayth.map((step, index) => (
              <li key={step}>
                <span>{step}</span>
                {index < hayth.length - 1 ? (
                  <b aria-hidden="true">{index === hayth.length - 2 ? '→' : '+'}</b>
                ) : null}
              </li>
            ))}
          </ol>
        </article>
      </div>

      <div className="program-aside">
        <MiniSticky>Made to explore.</MiniSticky>
      </div>

      <p className="callout">
        Students shouldn't have to wait until graduation to start preparing for the world beyond
        education. We don't believe they should have to choose between studying for their future
        and preparing for it.
      </p>
    </Section>
  )
}
