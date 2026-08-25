import { LegalPage } from './LegalPage'
import { PlaceholderNote } from '../components/ui/PlaceholderNote'

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="To be confirmed">
      <p>
        <PlaceholderNote>
          This Privacy Policy page is a placeholder. The official policy has not
          been published yet.
        </PlaceholderNote>
      </p>
      <p>
        Until the full policy is available, applications and enquiries sent to
        info@hayth-ai.com are used only to review interest in Hayth Organization.
      </p>
      <p>
        Questions: <a href="mailto:info@hayth-ai.com">info@hayth-ai.com</a>.
      </p>
    </LegalPage>
  )
}
