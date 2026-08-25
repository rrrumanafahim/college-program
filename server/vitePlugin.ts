import type { Plugin } from 'vite'
import { handleApplyRequest } from './handleApply.ts'

function run(req: Parameters<typeof handleApplyRequest>[0], res: Parameters<typeof handleApplyRequest>[1]) {
  void handleApplyRequest(req, res).catch(() => {
    if (!res.headersSent) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false }))
    }
  })
}

export function haythMailPlugin(): Plugin {
  return {
    name: 'hayth-mail-api',
    configureServer(server) {
      server.middlewares.use('/api/apply', (req, res) => {
        run(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/apply', (req, res) => {
        run(req, res)
      })
    },
  }
}
