import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { ApplyPage } from './pages/ApplyPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ProgramPage } from './pages/ProgramPage'
import { TermsPage } from './pages/TermsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/" element={<ProgramPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
