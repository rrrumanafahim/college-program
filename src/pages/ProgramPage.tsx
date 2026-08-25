import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ApplyCTA } from '../components/program/ApplyCTA'
import { Curriculum } from '../components/program/Curriculum'
import { FAQ } from '../components/program/FAQ'
import { Fees } from '../components/program/Fees'
import { Hero } from '../components/program/Hero'
import { StudentJourney } from '../components/program/StudentJourney'
import { Industry } from '../components/program/Industry'
import { LearningPathway } from '../components/program/LearningPathway'
import { Projects } from '../components/program/Projects'
import { WhatIsProgram } from '../components/program/WhatIsProgram'
import { WhoItsFor } from '../components/program/WhoItsFor'
import { WhyHayth } from '../components/program/WhyHayth'
import { JourneyRibbon } from '../components/illustrations/JourneyRibbon'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function ProgramPage() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const node = document.getElementById(id)
    node?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }, [location.hash, reduced])

  return (
    <div className="campus-world">
      <Hero />
      <JourneyRibbon
        step="01"
        title="The college"
        detail="O/A-Level academic learning and support"
      />
      <div className="area-college">
        <WhatIsProgram />
        <WhyHayth />
      </div>
      <JourneyRibbon
        step="02"
        title="The tech lab"
        detail="Explore AI, software, automation and technology"
      />
      <div className="area-lab">
        <Curriculum />
        <WhoItsFor />
      </div>
      <JourneyRibbon
        step="03"
        title="The building studio"
        detail="Create projects and practical work"
      />
      <div className="area-studio">
        <Projects />
      </div>
      <JourneyRibbon
        step="04"
        title="The project space"
        detail="Collaborate, experiment and solve problems"
      />
      <div className="area-space">
        <LearningPathway />
        <Industry />
      </div>
      <JourneyRibbon
        step="05"
        title="The future"
        detail="Grow your skills and unlock future opportunities"
      />
      <div className="area-future">
        <StudentJourney />
        <Fees />
        <FAQ />
      </div>
      <ApplyCTA />
    </div>
  )
}
