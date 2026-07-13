import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 160
const MOUSE_RADIUS = 140

const COLORS = ['232, 185, 35', '199, 154, 30', '255, 255, 255']

function useReducedMotion() {
  const ref = useRef(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    ref.current = query.matches
    const update = () => {
      ref.current = query.matches
    }
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return ref
}

export default function FlowFieldBackground() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const reducedRef = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return undefined

    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let frame = 0
    let visible = true
    let particles = []

    const angleAt = (x, y, t) => {
      // Hand-rolled pseudo curl-noise: layered sine/cosine fields instead of
      // a real noise library — cheap, dependency-free, and smooth enough for
      // a decorative background flow.
      return (
        Math.sin(x * 0.0022 + t * 0.35) * Math.PI +
        Math.cos(y * 0.0025 - t * 0.25) * Math.PI +
        Math.sin((x + y) * 0.0015 + t * 0.15) * Math.PI
      )
    }

    function spawnParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * 200,
      }
    }

    function resize() {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      ctx.fillRect(0, 0, width, height)
      particles = Array.from({ length: PARTICLE_COUNT }, spawnParticle)
    }

    function handleMove(clientX, clientY) {
      const rect = container.getBoundingClientRect()
      mouse.x = clientX - rect.left
      mouse.y = clientY - rect.top
    }

    const onMouseMove = (event) => handleMove(event.clientX, event.clientY)
    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (touch) handleMove(touch.clientX, touch.clientY)
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    function step() {
      frame += 1
      const t = frame * 0.01

      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)'
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        const angle = angleAt(p.x, p.y, t)
        let vx = Math.cos(angle) * 0.6
        let vy = Math.sin(angle) * 0.6

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 2.2
          vx += (dx / (dist || 1)) * force
          vy += (dy / (dist || 1)) * force
        }

        const px = p.x
        const py = p.y
        p.x += vx
        p.y += vy
        p.life -= 1

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          Object.assign(p, spawnParticle())
          continue
        }

        ctx.strokeStyle = `rgba(${p.color}, 0.5)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
    }

    let rafId = null
    function loop() {
      if (visible && !reducedRef.current) step()
      rafId = requestAnimationFrame(loop)
    }

    resize()
    loop()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(container)

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [reducedRef])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  )
}
