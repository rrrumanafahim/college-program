import { LegalPage } from './LegalPage'
import { PlaceholderNote } from '../components/ui/PlaceholderNote'

export function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="To be confirmed">
      <p>
        <PlaceholderNote>
          These Terms & Conditions are a placeholder. Official terms have not been
          finalised.
        </PlaceholderNote>
      </p>
      <p>
        Completing or applying to Hayth Organization does not create employment, paid work,
        an internship, or any guaranteed placement at Hayth Tech or elsewhere.
      </p>
      <p>
        Questions: <a href="mailto:info@hayth-ai.com">info@hayth-ai.com</a>.
      </p>
    </LegalPage>
  )
}
