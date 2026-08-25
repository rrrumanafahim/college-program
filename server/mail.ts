import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

export type HaythMail = {
  subject: string
  text: string
  replyTo: string
}

let transporter: Transporter | undefined

function getTransport() {
  if (transporter) return transporter

  if (process.env.MAIL_TRANSPORT === 'json') {
    transporter = nodemailer.createTransport({ jsonTransport: true })
    return transporter
  }

  if (!process.env.SMTP_HOST) {
    throw new Error('mail-not-configured')
  }

  const port = Number(process.env.SMTP_PORT || 587)
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  })
  return transporter
}

export async function sendHaythMail({ subject, text, replyTo }: HaythMail) {
  const from = process.env.MAIL_FROM || 'info@hayth-ai.com'
  const to = process.env.MAIL_TO || 'info@hayth-ai.com'

  await getTransport().sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
  })
}
