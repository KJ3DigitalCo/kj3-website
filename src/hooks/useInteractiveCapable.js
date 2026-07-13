import { useEffect, useState } from 'react'

// Shared gate for cursor-driven effects (spotlight, magnetic text/buttons):
// only enable on devices with a fine pointer, full motion, and enough room to matter.
export default function useInteractiveCapable() {
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const narrowQuery = window.matchMedia('(max-width: 767px)')

    const update = () => {
      setCapable(pointerQuery.matches && !motionQuery.matches && !narrowQuery.matches)
    }
    update()

    motionQuery.addEventListener('change', update)
    pointerQuery.addEventListener('change', update)
    narrowQuery.addEventListener('change', update)
    return () => {
      motionQuery.removeEventListener('change', update)
      pointerQuery.removeEventListener('change', update)
      narrowQuery.removeEventListener('change', update)
    }
  }, [])

  return capable
}
