import { useEffect, useMemo, useRef } from 'react'
import useInteractiveCapable from '../hooks/useInteractiveCapable.js'

const RADIUS = 110
const STRENGTH = 0.4
const SPACE = String.fromCharCode(32)

export default function MagneticText({ text, as: Tag = 'span', className = '' }) {
  const letterRefs = useRef([])
  const rectsRef = useRef([])
  const rafRef = useRef(null)
  const pointerRef = useRef({ x: -9999, y: -9999 })
  const interactive = useInteractiveCapable()

  const words = useMemo(() => text.split(SPACE), [text])

  useEffect(() => {
    if (!interactive) return undefined

    const measure = () => {
      rectsRef.current = letterRefs.current.map((node) => node?.getBoundingClientRect())
    }
    measure()

    const applyTransforms = () => {
      const { x, y } = pointerRef.current
      letterRefs.current.forEach((node, i) => {
        const rect = rectsRef.current[i]
        if (!node || !rect) return
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = x - cx
        const dy = y - cy
        const dist = Math.hypot(dx, dy)
        if (dist < RADIUS) {
          const pull = (1 - dist / RADIUS) * STRENGTH
          node.style.transform = `translate(${(dx * pull).toFixed(2)}px, ${(dy * pull).toFixed(2)}px)`
        } else {
          node.style.transform = ''
        }
      })
      rafRef.current = null
    }

    const queueApply = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(applyTransforms)
      }
    }

    const handleMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      queueApply()
    }

    const handleLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 }
      queueApply()
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    document.addEventListener('pointerleave', handleLeave)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
      document.removeEventListener('pointerleave', handleLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [interactive, words])

  let globalIndex = -1

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          const letterSpans = word.split('').map((char, ci) => {
            globalIndex += 1
            const idx = globalIndex
            return (
              <span
                key={ci}
                ref={(node) => {
                  letterRefs.current[idx] = node
                }}
                className={interactive ? 'magnetic-letter' : undefined}
              >
                {char}
              </span>
            )
          })

          return (
            <span key={wi}>
              <span className="inline-block whitespace-nowrap">{letterSpans}</span>
              {wi < words.length - 1 ? SPACE : null}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
