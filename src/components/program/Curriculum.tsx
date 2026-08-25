import { useState } from 'react'
import { Section } from '../ui/Section'
import { StudyBuildCreate } from '../ui/EditorialMedia'
import { ScribbleArrow, Whisper } from '../ui/AsideNotes'
import { photos } from '../../content/editorialImages'
import { TechLabBits } from '../illustrations/TechLabBits'
import '../ui/EditorialMedia.css'
import '../ui/AsideNotes.css'
import '../illustrations/Illustrations.css'

const topics = [
  {
    id: 'academics',
    title: 'O/A-Level Academic Support',
    summary: 'Teaching for the subjects you are actually taking.',
    detail:
      'Understanding, consistency, accountability, and Cambridge International examination preparation. This does not replace registering for your exams.',
  },
  {
    id: 'automation',
    title: 'Automation',
    summary: 'How automated workflows operate in practice.',
    detail:
      'Tools and workflows combined to solve practical problems, with an emphasis on understanding rather than buzzwords.',
  },
  {
    id: 'software',
    title: 'Software Development',
    summary: 'How modern software is designed and built.',
    detail:
      'Structure, logic, interfaces, and the habits that turn ideas into reliable programs.',
  },
  {
    id: 'problems',
    title: 'Problem Solving',
    summary: 'Breaking down real problems with method.',
    detail: 'Clear thinking, iteration, and collaboration, the way useful work actually happens.',
  },
  {
    id: 'projects',
    title: 'Project Building',
    summary: 'Turning training into work you can show.',
    detail: 'Apply, revise, and demonstrate competence. The next section is about how that looks.',
  },
  {
    id: 'professional',
    title: 'Professional Skills',
    summary: 'Communication, collaboration, and reliability.',
    detail: 'How to take feedback and operate with others, complementary to academic study.',
  },
]

export function Curriculum() {
  const [active, setActive] = useState(topics[0].id)

  return (
    <Section id="curriculum" className="curriculum-section area-lab">
      <TechLabBits />
      <div className="curriculum-compose">
        <header className="curriculum-copy">
          <p className="eyebrow">What's covered</p>
          <h2 className="section-title">The work of both tracks.</h2>
          <p className="section-intro">
            Open a card for the detail. Teaching follows your subjects. Industry preparation covers
            the areas below.
          </p>
          <div className="why-aside">
            <ScribbleArrow />
            <Whisper>subject notes, then build</Whisper>
          </div>
        </header>
        <StudyBuildCreate
          items={[
            { ...photos.notes, label: 'STUDY' },
            { ...photos.build, label: 'BUILD' },
            { ...photos.laptop, label: 'CREATE' },
          ]}
        />
      </div>
      <div className="curriculum">
        {topics.map((topic) => {
          const open = active === topic.id
          return (
            <button
              key={topic.id}
              type="button"
              className={`curriculum-card${open ? ' is-active' : ''}`}
              onClick={() => setActive(topic.id)}
              aria-expanded={open}
            >
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
              <div className="curriculum-detail" hidden={!open}>
                <p>{topic.detail}</p>
              </div>
            </button>
          )
        })}
      </div>
    </Section>
  )
}
