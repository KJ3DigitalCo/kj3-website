import { Routes, Route, useLocation } from 'react-router-dom'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import ServicesTicker from './components/ServicesTicker.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import GetQuotePage from './pages/GetQuotePage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import StrategyCallPage from './pages/StrategyCallPage.jsx'
import StrategyCallThankYouPage from './pages/StrategyCallThankYouPage.jsx'

// Ad-campaign landing pages get their own minimal header/footer (no nav
// links pulling visitors away), so the global chrome is skipped for them.
const MINIMAL_CHROME_PATHS = ['/free-strategy-call', '/strategy-call', '/strategy-call/thank-you']

function App() {
  const location = useLocation()
  const minimalChrome = MINIMAL_CHROME_PATHS.includes(location.pathname)

  return (
    <>
      <CustomCursor />
      {!minimalChrome && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/free-strategy-call" element={<GetQuotePage />} />
          <Route path="/strategy-call" element={<StrategyCallPage />} />
          <Route path="/strategy-call/thank-you" element={<StrategyCallThankYouPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>
      {!minimalChrome && (
        <>
          <ServicesTicker />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
