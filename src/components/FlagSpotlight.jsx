import { useEffect, useRef } from 'react'
import useInteractiveCapable from '../hooks/useInteractiveCapable.js'

export default function FlagSpotlight() {
  const wrapRef = useRef(null)
  const interactive = useInteractiveCapable()

  useEffect(() => {
    if (!interactive) return undefined
    const node = wrapRef.current
    if (!node) return undefined

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    // Listen on window: this wrapper sits behind sibling overlay/content
    // layers, so a listener on the node itself would never receive events
    // that hit those layers (siblings don't bubble to each other).
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [interactive])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 h-full w-full bg-cover"
        style={{ backgroundImage: 'url(/philippine-flag.webp)', backgroundPosition: 'left center' }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 bg-pine-deep ${interactive ? 'flag-spotlight-mask' : 'opacity-[0.93]'}`} />
    </div>
  )
}
