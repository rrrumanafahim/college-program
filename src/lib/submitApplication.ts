export type ApplicationPayload = {
  fullName: string
  email: string
  phone: string
  age: string
  school: string
  subjects: string
  location: string
  experience: string
  interests: string
  motivation: string
  portfolio: string
}

export async function submitApplication(payload: ApplicationPayload) {
  const response = await fetch('/api/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('submit-failed')
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null
  if (!result?.ok) {
    throw new Error('submit-failed')
  }
}
