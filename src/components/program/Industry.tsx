import { Button } from '../ui/Button'
import { Section } from '../ui/Section'
import { EditorialPhoto } from '../ui/EditorialMedia'
import { photos } from '../../content/editorialImages'
import './Industry.css'
import '../ui/EditorialMedia.css'

const focus = [
  {
    id: '01',
    title: 'AI',
    text: 'Building practical AI-powered solutions.',
  },
  {
    id: '02',
    title: 'Automation',
    text: 'Using technology to automate repetitive and valuable business processes.',
  },
  {
    id: '03',
    title: 'Software',
    text: 'Designing and developing useful software products and systems.',
  },
  {
    id: '04',
    title: 'Real projects',
    text: 'Applying technology to real problems rather than only classroom exercises.',
  },
]

export function Industry() {
  return (
    <Section
      id="industry"
      className="hai-section"
      eyebrow="Hayth Tech · Industry"
      title="One of those doors is Hayth Tech."
      intro="Hayth Organization prepares students. Hayth Tech is Hayth's technology industry, where selected students may eventually apply those skills."
    >
      <div className="hai-split">
        <div className="hai-copy">
          <p className="hai-name">Hayth Tech</p>
          <p className="hai-kicker">One of the industries within Hayth.</p>
          <EditorialPhoto
            className="hai-photo"
            src={photos.build.src}
            alt={photos.build.alt}
            variant="crop"
          />
          <p>
            Focused on AI, automation and software development: ideas turned into systems, products
            and solutions.
          </p>
          <p>
            Students who perform well can be shortlisted to work on official Hayth Tech projects
            while they are still studying. Completing the program is not the same as being hired.
          </p>
        </div>

        <div className="hai-visual">
          <article className="hai-panel">
            <p className="hai-panel-label">Hayth</p>
            <ul className="hai-tree">
              <li>
                <span>Hayth Organization</span>
                <small>Education</small>
              </li>
              <li className="is-ai">
                <span>Hayth Tech</span>
                <small>Technology</small>
              </li>
            </ul>
            <span className="hai-stamp">Selected</span>
          </article>

          <div className="hai-focus">
            {focus.map((item) => (
              <article className="info-card" key={item.id}>
                <span className="card-index">
                  {item.id} {item.title.toUpperCase()}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hai-cta">
          <Button href="https://hayth-ai.com" variant="ghost">
            Explore Hayth Tech →
          </Button>
        </div>
      </div>
    </Section>
  )
}
