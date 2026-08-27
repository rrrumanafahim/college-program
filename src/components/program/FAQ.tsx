import { Accordion } from '../ui/Accordion'
import { NoticeBoard } from '../illustrations/NoticeBoard'
import { Section } from '../ui/Section'
import '../illustrations/Illustrations.css'

export function FAQ() {
  return (
    <Section id="faq" className="area-future" eyebrow="FAQ" title="What you may still want to know.">
      <NoticeBoard>
        <Accordion
        items={[
          {
            id: 'who',
            question: 'Who is Hayth Organization for?',
            answer: (
              <p>
                Hayth Organization is for students who are ambitious about their studies and about
                building the base of their career at the same time. Hayth provides the facilities to
                train you on both paths, so when you graduate, you graduate with enough experience
                and knowledge to move further in your life.
              </p>
            ),
          },
          {
            id: 'college',
            question: 'Do I need to attend a college?',
            answer: (
              <p>
                No. You study as a private candidate. Students at a traditional college can also
                apply if they are willing to switch.
              </p>
            ),
          },
          {
            id: 'subjects',
            question: 'What subjects do you teach?',
            answer: (
              <p>
                The subjects you are actually taking. List them when you apply. There is no
                published subject list here.
              </p>
            ),
          },
          {
            id: 'tech',
            question: 'What is the technology training?',
            answer: (
              <p>We provide a vast range of technology training: automation, web applications, and software development.</p>
            ),
          },
          {
            id: 'why-both',
            question: 'Why combine academics and career?',
            answer: (
              <p>
                Usually when a student graduates, they find themselves having to look for a career
                and learn from the start, all alone. We want to change that. If you get trained
                while you are studying, you will be prepared to work professionally when it is time
                to graduate.
              </p>
            ),
          },
          {
            id: 'exams',
            question: 'Is this a replacement for Cambridge International examinations?',
            answer: (
              <p>
                No, we&apos;ll help you register for your exams but you remain responsible for the
                registration fee.
              </p>
            ),
          },
          {
            id: 'cost',
            question: 'Is the program free?',
            answer: (
              <p>
                No. PKR 10,000–30,000 per month, covering academic education and practical
                training. A traditional A-Level college commonly charges PKR 50,000–90,000.
              </p>
            ),
          },
          {
            id: 'exam-fees',
            question: 'Does the fee include Cambridge examination fees?',
            answer: <p>No. Those remain the student's responsibility.</p>,
          },
          {
            id: 'job',
            question: 'Will I get a job at Hayth Tech?',
            answer: (
              <p>
                Students who perform well will be shortlisted to work with Hayth Tech. Joining Hayth
                Organization is not the same as being hired.
              </p>
            ),
          },
          {
            id: 'earn',
            question: 'Can I earn while studying?',
            answer: (
              <p>
                Hayth Organization provides opportunities where you can earn and support yourself
                financially, if you are serious about the training and start working. In the best
                case, if you perform well, you will be able to work in our tech industry, Hayth
                Tech.
              </p>
            ),
          },
          {
            id: 'exam-income',
            question: 'Can those earnings help my education?',
            answer: (
              <p>
                Absolutely. If you want to be financially independent, you can learn, work, and
                fund your studies yourself.
              </p>
            ),
          },
          {
            id: 'experience',
            question: 'Do I need coding experience?',
            answer: <p>No. Prior technical experience is not required to apply.</p>,
          },
          {
            id: 'length',
            question: 'How long is the program?',
            answer: (
              <p>There is no particular period. We will support you until the end of your studies.</p>
            ),
          },
          {
            id: 'after',
            question: 'What happens after I apply?',
            answer: (
              <p>
                Applications are reviewed individually. Completing the form does not guarantee a
                place.
              </p>
            ),
          },
        ]}
      />
      </NoticeBoard>
    </Section>
  )
}
