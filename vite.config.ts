import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { haythMailPlugin } from './server/vitePlugin.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'MAIL_FROM',
    'MAIL_TO',
    'MAIL_TRANSPORT',
  ]) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [react(), haythMailPlugin()],
  }
})
