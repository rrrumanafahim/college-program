import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { Section } from '../ui/Section'
import { CircledWord, Whisper } from '../ui/AsideNotes'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './Projects.css'
import '../ui/AsideNotes.css'
import '../illustrations/Illustrations.css'

function useReveal(reduced: boolean) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced) {
      node.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return ref
}

function Showcase({
  index,
  title,
  category,
  text,
  flip,
  reduced,
  visual,
}: {
  index: string
  title: string
  category: string
  text: string
  flip?: boolean
  reduced: boolean
  visual: ReactNode
}) {
  const ref = useReveal(reduced)
  const stageRef = useRef<HTMLDivElement>(null)

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced) return
    const node = stageRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3))
    node.style.setProperty('--my', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3))
  }

  function onLeave() {
    const node = stageRef.current
    if (!node) return
    node.style.setProperty('--mx', '0')
    node.style.setProperty('--my', '0')
  }

  return (
    <article className={`bp-show${flip ? ' is-flip' : ''}`} ref={ref}>
      <div className="bp-copy">
        <p className="bp-index">{index}</p>
        <p className="bp-cat">{category}</p>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="bp-stage" ref={stageRef} onPointerMove={onMove} onPointerLeave={onLeave}>
        {visual}
      </div>
    </article>
  )
}

function AssistantVisual() {
  return (
    <div className="bp-scene bp-assistant">
      <div className="bp-win bp-chat bp-l1">
        <div className="bp-win-bar">
          <span>desk.local / studio</span>
          <b>live</b>
        </div>
        <div className="bp-chat-log">
          <div className="bp-msg in">
            Summarise this brief and suggest a next step I can build today.
          </div>
          <div className="bp-msg out">
            Three constraints. One recommended approach. Draft the data model first, then the reply
            actions.
          </div>
          <div className="bp-msg in">Turn that into a working help desk.</div>
          <div className="bp-msg out typing">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="bp-composer">Type a message to plan, draft or build…</div>
      </div>
      <div className="bp-win bp-tasks bp-l2">
        <p>Task panel</p>
        <ul>
          <li className="done">Capture brief</li>
          <li className="active">Draft response</li>
          <li>Create checklist</li>
          <li>Export notes</li>
        </ul>
      </div>
      <div className="bp-win bp-activity bp-l3">
        <p>Activity</p>
        <div className="bp-activity-row">
          <span>Reasoning</span>
          <b>1.4s</b>
        </div>
        <div className="bp-mini-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
        <small>Sources checked · 4</small>
      </div>
    </div>
  )
}

function WorkflowVisual() {
  return (
    <div className="bp-scene bp-flow">
      <div className="bp-win bp-canvas bp-l1">
        <div className="bp-win-bar">
          <span>workflow / student-ops</span>
        </div>
        <div className="bp-nodes">
          <div className="bp-node n1">
            <small>Trigger</small>
            <strong>Form submitted</strong>
          </div>
          <div className="bp-node n2">
            <small>Process</small>
            <strong>Parse fields</strong>
          </div>
          <div className="bp-node n3">
            <small>Logic</small>
            <strong>Route by intent</strong>
          </div>
          <div className="bp-node n4">
            <small>Action</small>
            <strong>Send update</strong>
          </div>
          <svg className="bp-wires" viewBox="0 0 640 280" fill="none" aria-hidden="true">
            <path d="M120 70H250M250 70V140H380M380 140V210H510" />
          </svg>
        </div>
      </div>
      <div className="bp-win bp-inspector bp-l2">
        <p>Trigger</p>
        <span>onSubmit</span>
        <p>Action</p>
        <span>notify.channel</span>
      </div>
      <div className="bp-win bp-run bp-l3">
        <p>Last run</p>
        <b>Passed</b>
        <small>12 steps · 840ms</small>
      </div>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="bp-scene bp-dash">
      <div className="bp-win bp-board bp-l1">
        <div className="bp-win-bar">
          <span>northstar / operations</span>
          <b>week 12</b>
        </div>
        <div className="bp-kpis">
          <div>
            <small>Active tasks</small>
            <strong>24</strong>
          </div>
          <div>
            <small>Resolved</small>
            <strong>18</strong>
          </div>
          <div>
            <small>Cycle time</small>
            <strong>2.1d</strong>
          </div>
        </div>
        <div className="bp-chart">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bp-table">
          <div>
            <span>Inbox triage</span>
            <b>On track</b>
          </div>
          <div>
            <span>Lead scoring</span>
            <b>Review</b>
          </div>
          <div>
            <span>Weekly digest</span>
            <b>Shipped</b>
          </div>
        </div>
      </div>
      <div className="bp-win bp-insight bp-l2">
        <p>Insight</p>
        <strong>Demand is clustering on Monday mornings.</strong>
        <small>Suggested: pre-draft the digest on Sunday.</small>
      </div>
      <div className="bp-win bp-gauge bp-l3">
        <p>Confidence</p>
        <div className="bp-ring" />
        <b>82%</b>
      </div>
    </div>
  )
}

function TrackerVisual() {
  return (
    <div className="bp-scene bp-dash">
      <div className="bp-win bp-board bp-l1">
        <div className="bp-win-bar">
          <span>revision / tracker</span>
          <b>term 2</b>
        </div>
        <div className="bp-kpis">
          <div>
            <small>Topics done</small>
            <strong>18</strong>
          </div>
          <div>
            <small>Due this week</small>
            <strong>6</strong>
          </div>
          <div>
            <small>Streak</small>
            <strong>9d</strong>
          </div>
        </div>
        <div className="bp-chart">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bp-table">
          <div>
            <span>Mechanics</span>
            <b>On track</b>
          </div>
          <div>
            <span>Organic chemistry</span>
            <b>Review</b>
          </div>
          <div>
            <span>Past papers</span>
            <b>Shipped</b>
          </div>
        </div>
      </div>
      <div className="bp-win bp-insight bp-l2">
        <p>Next session</p>
        <strong>Forty minutes on past-paper timing.</strong>
        <small>Suggested: two timed questions, then mark.</small>
      </div>
      <div className="bp-win bp-gauge bp-l3">
        <p>Coverage</p>
        <div className="bp-ring" />
        <b>74%</b>
      </div>
    </div>
  )
}

function BookingVisual() {
  return (
    <div className="bp-scene bp-web">
      <div className="bp-win bp-browser bp-l1">
        <div className="bp-chrome">
          <i />
          <i />
          <i />
          <span>studio.app / bookings</span>
        </div>
        <div className="bp-site">
          <aside>
            <b />
            <b />
            <b />
            <b />
          </aside>
          <div className="bp-site-main">
            <header>
              <strong>Session bookings</strong>
              <span>Pick a slot, confirm, then send the reminder.</span>
            </header>
            <div className="bp-table">
              <div>
                <span>Tue 16:00</span>
                <b>Open</b>
              </div>
              <div>
                <span>Wed 11:30</span>
                <b>Held</b>
              </div>
              <div>
                <span>Thu 18:00</span>
                <b>Booked</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bp-phone bp-l2">
        <span />
        <div className="bp-phone-ui">
          <b />
          <p />
          <p />
          <div />
        </div>
      </div>
    </div>
  )
}

function WebVisual() {
  return (
    <div className="bp-scene bp-web">
      <div className="bp-win bp-browser bp-l1">
        <div className="bp-chrome">
          <i />
          <i />
          <i />
          <span>studio.app / product</span>
        </div>
        <div className="bp-site">
          <aside>
            <b />
            <b />
            <b />
            <b />
          </aside>
          <div className="bp-site-main">
            <header>
              <strong>Launch workspace</strong>
              <span>Create a page, then connect a workflow.</span>
            </header>
            <div className="bp-site-cards">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
      <div className="bp-phone bp-l2">
        <span />
        <div className="bp-phone-ui">
          <b />
          <p />
          <p />
          <div />
        </div>
      </div>
    </div>
  )
}

const SLIDES = 6

export function Projects() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const paused = useRef(false)
  const drag = useRef({ x: 0, active: false })

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      if (!paused.current) setActive((current) => (current + 1) % SLIDES)
    }, 6500)
    return () => window.clearInterval(id)
  }, [reduced])

  function go(next: number) {
    setActive((next + SLIDES) % SLIDES)
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    drag.current = { x: event.clientX, active: true }
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return
    const delta = event.clientX - drag.current.x
    drag.current.active = false
    if (delta > 56) go(active - 1)
    else if (delta < -56) go(active + 1)
  }

  return (
    <Section
      id="projects"
      className="bp-section area-studio"
      eyebrow="Build real projects"
      title={
        <>
          Don't just learn. <CircledWord>Build.</CircledWord>
        </>
      }
      intro="Skills aren't built by watching. Projects are where you apply knowledge, make mistakes safely, take feedback, and show what you can actually do. These showcases are training examples, not client work."
    >
      <Whisper className="projects-aside">Your ideas belong here.</Whisper>
      <div
        className="bp-carousel"
        onMouseEnter={() => {
          paused.current = true
        }}
        onMouseLeave={() => {
          paused.current = false
        }}
      >
        <div
          className="bp-viewport"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current.active = false
          }}
        >
          <div
            className={`bp-track${reduced ? ' is-static' : ''}`}
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            <div className="bp-slide">
              <Showcase
                index="01"
                title="Help Desk"
                category="Conversation · Product"
                text="A working support product: the student designs the interface, the task flow and the reply behaviour, then ships something a person can actually use."
                reduced={reduced}
                visual={<AssistantVisual />}
              />
            </div>
            <div className="bp-slide">
              <Showcase
                index="02"
                title="Automation Workflow"
                category="Systems · Operations"
                text="A connected sequence of triggers, logic and actions. Students learn to turn a repetitive process into a reliable system."
                flip
                reduced={reduced}
                visual={<WorkflowVisual />}
              />
            </div>
            <div className="bp-slide">
              <Showcase
                index="03"
                title="Operations Dashboard"
                category="Dashboard · Insight"
                text="A practical internal tool: live numbers, a clear workflow, and a note layer that helps someone decide what to do next."
                reduced={reduced}
                visual={<DashboardVisual />}
              />
            </div>
            <div className="bp-slide">
              <Showcase
                index="04"
                title="Web Application"
                category="Product · Interface"
                text="A functional web app with structure, navigation and a real user journey, designed to work on desktop and smaller screens."
                flip
                reduced={reduced}
                visual={<WebVisual />}
              />
            </div>
            <div className="bp-slide">
              <Showcase
                index="05"
                title="Revision Tracker"
                category="Learning · Product"
                text="A progress tool for subjects, deadlines and streaks, so students practise building something they would actually use while studying."
                reduced={reduced}
                visual={<TrackerVisual />}
              />
            </div>
            <div className="bp-slide">
              <Showcase
                index="06"
                title="Booking System"
                category="Forms · Operations"
                text="A slot-based booking flow: availability, confirmation and reminders, built as a small product rather than a classroom exercise."
                flip
                reduced={reduced}
                visual={<BookingVisual />}
              />
            </div>
          </div>
        </div>

        <div className="bp-controls">
          <button
            type="button"
            className="bp-arrow"
            aria-label="Previous project"
            onClick={() => go(active - 1)}
          >
            ←
          </button>
          <div className="bp-dots" role="tablist" aria-label="Project slides">
            {Array.from({ length: SLIDES }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show project ${i + 1}`}
                className={`bp-dot${i === active ? ' is-active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="bp-arrow"
            aria-label="Next project"
            onClick={() => go(active + 1)}
          >
            →
          </button>
        </div>
      </div>
    </Section>
  )
}
