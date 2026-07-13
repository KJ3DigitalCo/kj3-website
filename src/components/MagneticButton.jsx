import { useEffect, useRef } from 'react'
import useInteractiveCapable from '../hooks/useInteractiveCapable.js'

const STRENGTH = 0.3

export default function MagneticButton({ as: Tag = 'a', className = '', children, ...rest }) {
  const ref = useRef(null)
  const interactive = useInteractiveCapable()

  useEffect(() => {
    if (!interactive) return undefined
    const node = ref.current
    if (!node) return undefined

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      node.style.transform = `translate(${(dx * STRENGTH).toFixed(2)}px, ${(dy * STRENGTH).toFixed(2)}px)`
    }

    const handleLeave = () => {
      node.style.transform = ''
    }

    node.addEventListener('pointermove', handleMove)
    node.addEventListener('pointerleave', handleLeave)
    return () => {
      node.removeEventListener('pointermove', handleMove)
      node.removeEventListener('pointerleave', handleLeave)
    }
  }, [interactive])

  return (
    <Tag
      ref={ref}
      className={`inline-block transition duration-200 ease-out ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
