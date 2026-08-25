import { Button } from '../ui/Button'
import { Section } from '../ui/Section'
import './Fees.css'

const included = [
  'Academic teaching for the subjects you take',
  'Industry preparation',
  'Project work and feedback',
  'Performance evaluation',
]

export function Fees() {
  return (
    <Section
      id="fees"
      className="fees-section"
      eyebrow="Fees"
      title="What it costs."
      intro="PKR 10,000–30,000 per month. Academic education and practical training together, typically for less than a traditional A-Level college."
    >
      <article className="fees-card">
        <p className="fees-card-kicker">Hayth Organization program</p>
        <p className="fees-amount">
          PKR 10,000–30,000
          <span> / month</span>
        </p>
        <p className="fees-lead">
          Both tracks, one fee. Cambridge International examination fees are paid separately.
        </p>

        <dl className="fees-structure">
          <div>
            <dt>Program fee</dt>
            <dd>PKR 10,000–30,000 / month</dd>
          </div>
          <div>
            <dt>Cambridge examination fees</dt>
            <dd>Paid separately by the student</dd>
          </div>
          <div>
            <dt>Compared with a traditional A-Level college</dt>
            <dd>Lower monthly cost, with education and training included</dd>
          </div>
        </dl>

        <p className="fees-includes-label">Included</p>
        <ul className="fees-includes">
          {included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Button to="/apply">Get started now →</Button>
      </article>
    </Section>
  )
}
