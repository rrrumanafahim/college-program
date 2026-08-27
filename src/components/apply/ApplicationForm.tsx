import { useEffect, useState, type FormEvent } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { Button } from '../ui/Button'
import { submitApplication } from '../../lib/submitApplication'
import 'react-phone-number-input/style.css'
import './ApplicationForm.css'

const INTERESTS = [
  'O/A-Level academic support',
  'AI & Automation',
  'Software Development',
  'Problem Solving',
  'Project Building',
  'Professional Skills',
] as const

type Field =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'age'
  | 'school'
  | 'subjects'
  | 'location'
  | 'experience'
  | 'interests'
  | 'motivation'
  | 'portfolio'
  | 'confirm'

type Values = Record<Exclude<Field, 'interests' | 'confirm'>, string> & {
  interests: string[]
  confirm: boolean
}

const empty: Values = {
  fullName: '',
  email: '',
  phone: '',
  age: '',
  school: '',
  subjects: '',
  location: '',
  experience: '',
  interests: [],
  motivation: '',
  portfolio: '',
  confirm: false,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /^https?:\/\/\S+$/i

function validate(values: Values) {
  const errors: Partial<Record<Field, string>> = {}

  if (values.fullName.trim().length < 2) errors.fullName = 'Enter your full name.'
  if (!EMAIL.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.phone || !isValidPhoneNumber(values.phone)) {
    errors.phone = 'Enter a valid phone number for the selected country.'
  }

  const age = Number(values.age)
  if (!values.age || Number.isNaN(age) || age < 14 || age > 25) {
    errors.age = 'Enter your age (14-25).'
  }

  if (values.school.trim().length < 2) {
    errors.school = 'Tell us how you are preparing, or if you are switching from a college.'
  }
  if (values.subjects.trim().length < 3) {
    errors.subjects = 'List your current O/A-Level subjects.'
  }
  if (values.location.trim().length < 2) errors.location = 'Enter your city and country.'
  if (values.experience.trim().length < 8) {
    errors.experience = 'Tell us about your previous experience, even if it is none.'
  }
  if (values.interests.length === 0) errors.interests = 'Select at least one area of interest.'
  if (values.motivation.trim().length < 24) {
    errors.motivation = 'Please share a little more about why you want to join.'
  }
  if (values.portfolio.trim() && !URL_PATTERN.test(values.portfolio.trim())) {
    errors.portfolio = 'Enter a full link starting with http:// or https://.'
  }
  if (!values.confirm) errors.confirm = 'Please confirm that the information is accurate.'

  return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p className="ap-error" id={id} role="alert">
      {message}
    </p>
  )
}

export function ApplicationForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function toggleInterest(interest: string) {
    setValues((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const honey = (event.currentTarget.elements.namedItem('company') as HTMLInputElement | null)
      ?.value
    if (honey) {
      setValues(empty)
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const order: Field[] = [
        'fullName',
        'email',
        'phone',
        'age',
        'school',
        'subjects',
        'location',
        'experience',
        'interests',
        'motivation',
        'portfolio',
        'confirm',
      ]
      const first = order.find((key) => nextErrors[key])
      const node = event.currentTarget.querySelector<HTMLElement>(
        first === 'interests'
          ? 'input[name="interests"]'
          : first === 'confirm'
            ? 'input[name="confirm"]'
            : first === 'phone'
              ? '.PhoneInputInput'
              : `[name="${first}"]`,
      )
      node?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitApplication({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        age: values.age.trim(),
        school: values.school.trim(),
        subjects: values.subjects.trim(),
        location: values.location.trim(),
        experience: values.experience.trim(),
        interests: values.interests.join(', '),
        motivation: values.motivation.trim(),
        portfolio: values.portfolio.trim(),
      })
      setValues(empty)
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="ap-result" role="status">
        <p className="eyebrow">Apply</p>
        <h2>Application received.</h2>
        <p>
          Thank you for applying. We'll review your application and contact you with the next
          steps.
        </p>
        <p className="ap-note">
          Completing this form does not guarantee a place. Shortlisting for Hayth Tech work depends
          on performance.
        </p>
      </div>
    )
  }

  return (
    <form className="ap-form" onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'}>
      <input type="text" name="company" className="ap-honeypot" tabIndex={-1} autoComplete="off" />

      <p className="ap-required-note">Required fields are marked with *</p>

      <div className="ap-grid">
        <label className="ap-field">
          Full Name *
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => set('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'err-fullName' : undefined}
            required
          />
          <FieldError id="err-fullName" message={errors.fullName} />
        </label>

        <label className="ap-field">
          Email *
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => set('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'err-email' : undefined}
            required
          />
          <FieldError id="err-email" message={errors.email} />
        </label>

        <div className="ap-field">
          <label id="phone-label" htmlFor="apply-phone">
            Phone Number *
          </label>
          <PhoneInput
            international
            defaultCountry="PK"
            countryCallingCodeEditable={false}
            value={values.phone || undefined}
            onChange={(value) => set('phone', value || '')}
            numberInputProps={{
              id: 'apply-phone',
              name: 'phone',
              autoComplete: 'tel',
              'aria-labelledby': 'phone-label',
              'aria-invalid': Boolean(errors.phone),
              'aria-describedby': errors.phone ? 'err-phone' : undefined,
              required: true,
            }}
            className={errors.phone ? 'ap-phone is-invalid' : 'ap-phone'}
          />
          <FieldError id="err-phone" message={errors.phone} />
        </div>

        <label className="ap-field">
          Age *
          <input
            name="age"
            type="number"
            inputMode="numeric"
            min={14}
            max={25}
            value={values.age}
            onChange={(event) => set('age', event.target.value)}
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? 'err-age' : undefined}
            required
          />
          <FieldError id="err-age" message={errors.age} />
        </label>

        <label className="ap-field ap-span">
          How you are preparing *
          <input
            name="school"
            type="text"
            placeholder="e.g. Preparing privately, or switching from a traditional college"
            value={values.school}
            onChange={(event) => set('school', event.target.value)}
            aria-invalid={Boolean(errors.school)}
            aria-describedby={errors.school ? 'err-school' : undefined}
            required
          />
          <FieldError id="err-school" message={errors.school} />
        </label>

        <label className="ap-field ap-span">
          Current O/A-Level subjects *
          <input
            name="subjects"
            type="text"
            placeholder="e.g. Maths, Physics, Computer Science"
            value={values.subjects}
            onChange={(event) => set('subjects', event.target.value)}
            aria-invalid={Boolean(errors.subjects)}
            aria-describedby={errors.subjects ? 'err-subjects' : undefined}
            required
          />
          <FieldError id="err-subjects" message={errors.subjects} />
        </label>

        <label className="ap-field ap-span">
          City / Country *
          <input
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. London, United Kingdom"
            value={values.location}
            onChange={(event) => set('location', event.target.value)}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'err-location' : undefined}
            required
          />
          <FieldError id="err-location" message={errors.location} />
        </label>

        <label className="ap-field ap-span">
          Previous coding or technology experience *
          <textarea
            name="experience"
            rows={4}
            placeholder="Share what you have tried so far. None is a valid answer."
            value={values.experience}
            onChange={(event) => set('experience', event.target.value)}
            aria-invalid={Boolean(errors.experience)}
            aria-describedby={errors.experience ? 'err-experience' : undefined}
            required
          />
          <FieldError id="err-experience" message={errors.experience} />
        </label>

        <fieldset
          className="ap-field ap-span"
          aria-invalid={Boolean(errors.interests)}
          aria-describedby={errors.interests ? 'err-interests' : undefined}
        >
          <legend>Areas of interest *</legend>
          <div className="ap-checks">
            {INTERESTS.map((interest) => (
              <label key={interest} className="ap-check">
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={values.interests.includes(interest)}
                  onChange={() => toggleInterest(interest)}
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
          <FieldError id="err-interests" message={errors.interests} />
        </fieldset>

        <label className="ap-field ap-span">
          Why do you want to join the program? *
          <textarea
            name="motivation"
            rows={5}
            value={values.motivation}
            onChange={(event) => set('motivation', event.target.value)}
            aria-invalid={Boolean(errors.motivation)}
            aria-describedby={errors.motivation ? 'err-motivation' : undefined}
            required
          />
          <FieldError id="err-motivation" message={errors.motivation} />
        </label>

        <label className="ap-field ap-span">
          Portfolio / GitHub / project link
          <input
            name="portfolio"
            type="url"
            inputMode="url"
            placeholder="https://"
            value={values.portfolio}
            onChange={(event) => set('portfolio', event.target.value)}
            aria-invalid={Boolean(errors.portfolio)}
            aria-describedby={errors.portfolio ? 'err-portfolio' : undefined}
          />
          <FieldError id="err-portfolio" message={errors.portfolio} />
        </label>
      </div>

      <label className="ap-confirm">
        <input
          type="checkbox"
          name="confirm"
          checked={values.confirm}
          onChange={(event) => set('confirm', event.target.checked)}
          aria-invalid={Boolean(errors.confirm)}
          aria-describedby={errors.confirm ? 'err-confirm' : undefined}
          required
        />
        <span>I confirm that the information provided is accurate. *</span>
      </label>
      <FieldError id="err-confirm" message={errors.confirm} />

      {status === 'error' ? (
        <p className="ap-banner" role="alert">
          Something went wrong. Please try again in a moment. If it keeps failing, email
          info@hayth-ai.com.
        </p>
      ) : null}

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit Application →'}
      </Button>
    </form>
  )
}
