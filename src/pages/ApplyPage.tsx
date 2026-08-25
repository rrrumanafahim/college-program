import { useEffect } from 'react'
import { ApplicationForm } from '../components/apply/ApplicationForm'
import { EditorialPhoto } from '../components/ui/EditorialMedia'
import { photos } from '../content/editorialImages'
import '../components/ui/EditorialMedia.css'

export function ApplyPage() {
  useEffect(() => {
    document.title = 'Apply · Hayth Organization'
    return () => {
      document.title = 'Hayth Organization'
    }
  }, [])

  return (
    <article className="ap-page">
      <div className="container ap-shell">
        <div className="ap-intro">
          <p className="eyebrow">Hayth Organization · Private O/A-Level Education</p>
          <h1>Apply to Hayth Organization.</h1>
          <p className="ap-lede">
            For private O/A-Level candidates. PKR 10,000–30,000 per month. Cambridge examination
            fees are separate. Applications are reviewed individually. A place is not guaranteed.
          </p>
          <EditorialPhoto
            src={photos.notes.src}
            alt={photos.notes.alt}
            variant="polaroid"
            caption="bring your subjects with you"
            className="ed-photo-tilt-left"
          />
        </div>
        <div className="ap-card">
          <ApplicationForm />
        </div>
      </div>
    </article>
  )
}
