import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import BuildTransition from '../components/BuildTransition.jsx'
import ValueProps from '../components/ValueProps.jsx'
import Services from '../components/Services.jsx'
import Pricing from '../components/Pricing.jsx'
import Process from '../components/Process.jsx'
import Contact from '../components/Contact.jsx'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return undefined
    const id = location.hash.slice(1)

    // A hard jump straight to an anchor below the fold can land mid-way
    // through BuildTransition's ScrollTrigger pin setup and destabilize it.
    // We scroll once after a buffer for GSAP's own deferred refresh, then
    // re-assert a moment later in case that refresh resets scroll position.
    const scrollToTarget = () => {
      const target = document.getElementById(id)
      if (target) target.scrollIntoView({ block: 'start' })
    }

    const timeouts = [setTimeout(scrollToTarget, 400), setTimeout(scrollToTarget, 900)]

    return () => timeouts.forEach(clearTimeout)
  }, [location.hash])

  return (
    <>
      <Seo
        title="KJ3 Digital Co. | Digital Marketing Agency in the Philippines"
        description="Websites, social media, SEO, paid ads, and more for local and small businesses across the Philippines — fast turnarounds, always checked by a real strategist."
        path="/"
      />
      <Hero />
      <BuildTransition />
      <ValueProps />
      <Services />
      <Pricing />
      <Process />
      <Contact />
    </>
  )
}
