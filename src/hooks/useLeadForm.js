import { useState } from 'react'

const SHEET_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyIWKnuPqu1fGUdYMh2wmL0b03oOL-RnH50q5-nA_oaj0s-Cg90o5IlMNkcfAB5olfu9A/exec'

export const SERVICE_OPTIONS = [
  'Not sure yet',
  'Website Build',
  'Social Media Management',
  'DM Sales Handling',
  'Content Creation',
  'Paid Ads Management',
  'SEO',
  'Chatbot Automation',
]

const EMPTY_FORM = {
  name: '',
  business: '',
  email: '',
  phone: '',
  service: SERVICE_OPTIONS[0],
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Shared by the main Contact form and the ad-campaign landing page — both
// feed the same Google Sheet + email notification. `source` is tagged onto
// each submission so the Sheet shows which form it came from.
export default function useLeadForm(source = 'Unknown') {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.business.trim()) nextErrors.business = 'Please enter your business name.'
    if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = 'Please enter a valid email.'
    if (!form.message.trim()) nextErrors.message = 'Tell us a bit about what you need.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')

    try {
      // Apps Script Web Apps don't handle CORS preflight requests, so this
      // uses no-cors + text/plain to keep it a "simple request" (no
      // preflight) — that also means the response is opaque and we can't
      // read result.success back, so a resolved fetch is our only signal.
      await fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          source,
          name: form.name,
          business: form.business,
          email: form.email,
          phone: form.phone || 'Not provided',
          service: form.service,
          message: form.message,
        }),
      })
      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  return { form, errors, status, updateField, handleSubmit, setStatus }
}
