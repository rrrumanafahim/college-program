import { isValidPhoneNumber } from 'libphonenumber-js'

export type ApplicationInput = {
  fullName?: unknown
  email?: unknown
  phone?: unknown
  age?: unknown
  school?: unknown
  subjects?: unknown
  location?: unknown
  experience?: unknown
  interests?: unknown
  motivation?: unknown
  portfolio?: unknown
  company?: unknown
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /^https?:\/\/\S+$/i

export type ValidApplication = {
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

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateApplication(input: ApplicationInput): ValidApplication | 'spam' | null {
  if (text(input.company)) {
    return 'spam'
  }

  const fullName = text(input.fullName)
  const email = text(input.email)
  const phone = text(input.phone)
  const age = text(input.age)
  const school = text(input.school)
  const subjects = text(input.subjects)
  const location = text(input.location)
  const experience = text(input.experience)
  const interests = text(input.interests)
  const motivation = text(input.motivation)
  const portfolio = text(input.portfolio)
  const ageNumber = Number(age)

  if (fullName.length < 2) return null
  if (!EMAIL.test(email)) return null
  if (!phone || !isValidPhoneNumber(phone)) return null
  if (!age || Number.isNaN(ageNumber) || ageNumber < 14 || ageNumber > 25) return null
  if (school.length < 2) return null
  if (subjects.length < 3) return null
  if (location.length < 2) return null
  if (experience.length < 8) return null
  if (interests.length < 2) return null
  if (motivation.length < 24) return null
  if (portfolio && !URL_PATTERN.test(portfolio)) return null

  return {
    fullName,
    email,
    phone,
    age,
    school,
    subjects,
    location,
    experience,
    interests,
    motivation,
    portfolio,
  }
}

export function formatApplicationEmail(application: ValidApplication) {
  const submittedAt = new Date().toISOString()

  return [
    'NEW HAYTH PROGRAM APPLICATION',
    '',
    `Name: ${application.fullName}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `Age: ${application.age}`,
    `How they are preparing: ${application.school}`,
    `O/A-Level Subjects: ${application.subjects}`,
    `City / Country: ${application.location}`,
    `Previous Experience: ${application.experience}`,
    `Areas of Interest: ${application.interests}`,
    `Why They Want to Join: ${application.motivation}`,
    `Portfolio / GitHub: ${application.portfolio || 'Not provided'}`,
    `Submitted At: ${submittedAt}`,
  ].join('\n')
}
