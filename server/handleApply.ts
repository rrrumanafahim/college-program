import type { IncomingMessage, ServerResponse } from 'node:http'
import { validateApplication, formatApplicationEmail, type ApplicationInput } from './application.ts'
import { takeApplicationSlot } from './duplicates.ts'
import { sendHaythMail } from './mail.ts'

const MAX_BODY = 50_000

function readJson(req: IncomingMessage) {
  return new Promise<unknown>((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('too-large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('invalid-json'))
      }
    })
    req.on('error', reject)
  })
}

function send(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export async function handleApplyRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    send(res, 405, { ok: false })
    return
  }

  let payload: unknown
  try {
    payload = await readJson(req)
  } catch {
    send(res, 400, { ok: false })
    return
  }

  const application = validateApplication((payload ?? {}) as ApplicationInput)
  if (application === 'spam') {
    send(res, 200, { ok: true })
    return
  }
  if (!application) {
    send(res, 400, { ok: false })
    return
  }

  const isNew = takeApplicationSlot(application.email)
  if (!isNew) {
    send(res, 200, { ok: true })
    return
  }

  try {
    await sendHaythMail({
      subject: 'New Student Program Application',
      replyTo: application.email,
      text: formatApplicationEmail(application),
    })
    send(res, 200, { ok: true })
  } catch {
    send(res, 500, { ok: false })
  }
}
