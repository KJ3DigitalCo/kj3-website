import { useEffect, useRef } from 'react'
import useInteractiveCapable from '../hooks/useInteractiveCapable.js'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const interactive = useInteractiveCapable()

  useEffect(() => {
    if (!interactive) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.documentElement.classList.add('cursor-none-active')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    let frame

    const handleMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
    }

    const handleLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const handleEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    frame = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('cursor-none-active')
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      cancelAnimationFrame(frame)
    }
  }, [interactive])

  if (!interactive) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 rounded-full bg-marigold transition-opacity duration-200"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-8 w-8 rounded-full border-2 border-marigold transition-opacity duration-200"
        aria-hidden="true"
      />
    </>
  )
}
