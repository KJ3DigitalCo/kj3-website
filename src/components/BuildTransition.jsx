import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Radial wedges from the center point, like a pizza cut (approximate, not
// exact) — each piece is a triangle fan from center outward; points beyond
// 0-100% just get clipped to the element's own box, so this is a cheap way
// to get pizza-slice-shaped fragments without rectangle-intersection math.
const WEDGE_COUNT = 12
const SPARK_COUNT = 28

function wedgeClipPath(index) {
  const angleStep = 360 / WEDGE_COUNT
  // Each wedge overlaps its neighbors well past their exact boundary —
  // adjacent clip-path edges otherwise leave a hairline anti-aliasing seam
  // that reads as a crack any time text passes through it, not just at rest.
  const overlap = 7
  const start = index * angleStep - overlap
  const end = start + angleStep + overlap * 2
  const far = (deg) => {
    const rad = (deg * Math.PI) / 180
    return `${(50 + 200 * Math.cos(rad)).toFixed(1)}% ${(50 + 200 * Math.sin(rad)).toFixed(1)}%`
  }
  return `polygon(50% 50%, ${far(start)}, ${far((start + end) / 2)}, ${far(end)})`
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

export default function BuildTransition() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const pieceRefs = useRef([])
  const letsRefs = useRef([])
  const buildRefs = useRef([])
  const flashRef = useRef(null)
  const taglineRef = useRef(null)
  const sparkRefs = useRef([])
  const ringRef = useRef(null)

  useEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      gsap.set(letsRefs.current, { x: '-60vw' })
      gsap.set(buildRefs.current, { x: '60vw' })
      gsap.set(flashRef.current, { opacity: 0 })
      gsap.set(taglineRef.current, { opacity: 0 })
      gsap.set(ringRef.current, { opacity: 0, scale: 0 })
      // Each spark is a tiny ember that actually FLIES outward at its own
      // random angle (not a fixed radial ray) with a downward gravity bias,
      // like a welding/grinder spark shower — not a clean symmetric burst.
      gsap.set(sparkRefs.current, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        rotation: () => gsap.utils.random(0, 360),
        scale: () => gsap.utils.random(0.9, 1.8),
        opacity: 0,
      })

      // The collision -> recoil -> spark -> hold -> tagline beat plays on
      // its own real-time clock once triggered, instead of being tied to
      // scroll position — so it always reads smoothly regardless of how
      // fast or slow the user scrolls. Only the slide-in and the shatter
      // remain scroll-scrubbed.
      // All durations/offsets here are half of what they were — 2x faster.
      // NOTE: this timeline deliberately never touches `x` on letsRefs/
      // buildRefs — the recoil lives in the scroll-scrubbed master timeline
      // instead. Two independent timelines both driving the same property
      // on the same target is what caused the reverse-scroll bug: a TO-tween
      // caches its start value the first time it plays, so reversing it
      // later snaps back to that stale cached value instead of wherever the
      // OTHER timeline has since moved the property to.
      const autoTl = gsap.timeline({ paused: true })
      autoTl
        // Burst (flash, ring, sparks) fires FIRST, right at 0 — the bump
        // follows a beat after, instead of happening at the same time. This
        // reads as: impact flashes, then the physical thump lands — smoother
        // and more cascading than everything hitting at once.
        .to(flashRef.current, { opacity: 1, duration: 0.075, ease: 'power1.out' }, 0)
        .fromTo(ringRef.current, { scale: 0, opacity: 1 }, { scale: 26, opacity: 0, duration: 0.3, ease: 'power2.out' }, 0)
        // Sparks actually fly outward at their own angle with a downward
        // gravity bias, fading as they travel — a shower of embers, not a
        // symmetric ring of static rays.
        .to(sparkRefs.current, { opacity: 1, duration: 0.05 }, 0)
        .to(
          sparkRefs.current,
          {
            x: (i, target) => {
              const angle = (gsap.getProperty(target, 'rotation') * Math.PI) / 180
              return Math.cos(angle) * gsap.utils.random(50, 170)
            },
            y: (i, target) => {
              const angle = (gsap.getProperty(target, 'rotation') * Math.PI) / 180
              return Math.sin(angle) * gsap.utils.random(50, 170) + gsap.utils.random(15, 50)
            },
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.006,
          },
          0,
        )
        .to(stageRef.current, { scale: 1.04, duration: 0.075, ease: 'power1.out' }, 0.04)
        .to(stageRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' }, 0.115)
        .to(flashRef.current, { opacity: 0, duration: 0.175, ease: 'power1.in' }, '+=0.025')

      // autoState tracks whether the auto-beat has played forward, so it can
      // be properly REVERSED when the user scrolls back up past the
      // collision point — otherwise its effects (recoil offset, tagline
      // opacity) just stay stuck while the master timeline tries to reverse
      // the entrance underneath it, which is what was causing the "stuck"
      // bug instead of sliding back off-screen cleanly.
      let autoState = 0 // 0 = not yet played, 1 = played forward
      const collisionThreshold = 2 / 7

      // Scroll-scrubbed master timeline: only the slide-in (0 -> 2) and the
      // shatter (4 -> 7) are tied to scroll position. The gap between them
      // (2 -> 4) is a much smaller buffer than before — just enough for the
      // now-2x-faster auto-playing beat to finish — so scrolling doesn't
      // feel like it stalls waiting for a huge dead zone.
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=230%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate(self) {
            if (self.direction === 1 && self.progress >= collisionThreshold && autoState === 0) {
              autoState = 1
              autoTl.play(0)
            } else if (self.direction === -1 && self.progress < collisionThreshold && autoState === 1) {
              autoState = 0
              autoTl.reverse()
            }
          },
        },
      })
        // A brief pull-back further off-screen before the real launch —
        // anticipation, so the entrance has some wind-up instead of just
        // coasting straight in.
        .to(letsRefs.current, { x: '-64vw', duration: 0.15, ease: 'power1.inOut' }, 0)
        .to(buildRefs.current, { x: '64vw', duration: 0.15, ease: 'power1.inOut' }, 0)
        .to(letsRefs.current, { x: 0, duration: 1.85, ease: 'power2.out' }, 0.15)
        .to(buildRefs.current, { x: 0, duration: 1.85, ease: 'power2.out' }, 0.15)
        // Recoil lives here (scroll-scrubbed), not in autoTl — see the note
        // on autoTl above for why. The tagline's opacity lives entirely here
        // too, for the same reason: it used to fade in via autoTl (real
        // time) and fade out via this timeline (scroll-scrubbed), and having
        // two timelines drive one property caused the fade-out to get stuck
        // — scrubbing to any point before the fade-out's start re-applied
        // its cached "from" value, permanently overriding autoTl's control.
        // Keeping the whole fade in -> hold -> fade out sequence in one
        // timeline avoids that entirely.
        .to(letsRefs.current, { x: '-2.2vw', duration: 0.25, ease: 'back.out(2)' }, 2)
        .to(buildRefs.current, { x: '2.2vw', duration: 0.25, ease: 'back.out(2)' }, 2)
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' },
          2.55,
        )
        // Tagline falls away with the rest as the shatter begins.
        .to(taglineRef.current, { opacity: 0, y: 40, duration: 0.6, ease: 'power1.in' }, 4)
        .to(
          pieceRefs.current,
          {
            x: (i) => {
              const angleStep = 360 / WEDGE_COUNT
              const centerAngle = i * angleStep + angleStep / 2
              const rad = (centerAngle * Math.PI) / 180
              const dir = Math.cos(rad) < 0 ? -1 : 1
              return `${dir * gsap.utils.random(18, 38)}vw`
            },
            y: () => `${gsap.utils.random(140, 220)}vh`,
            rotation: () => gsap.utils.random(-12, 12),
            opacity: 0,
            duration: 3,
            ease: 'power2.in',
            stagger: { each: 0.045, from: 'center' },
          },
          4,
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <>
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden bg-black"
    >
      <div ref={flashRef} className="pointer-events-none absolute inset-0 bg-marigold-deep/60 opacity-0" />

      <div ref={ringRef} className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-marigold opacity-0" />
      {Array.from({ length: SPARK_COUNT }).map((_, i) => {
        // Mix of white-hot, gold and deeper-orange embers, varied sizes —
        // a shower, not a uniform ring of identical rays.
        const colorClasses = [
          'from-transparent via-paper to-paper',
          'from-transparent via-marigold to-marigold',
          'from-transparent via-marigold-deep to-marigold',
        ]
        const color = colorClasses[i % colorClasses.length]
        const width = 3 + (i % 3) * 1.2
        const height = 18 + ((i * 7) % 18) * 1.8
        return (
          <div
            key={i}
            ref={(el) => {
              sparkRefs.current[i] = el
            }}
            className={`pointer-events-none absolute left-1/2 top-1/2 bg-gradient-to-t ${color} opacity-0`}
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        )
      })}

      <div ref={stageRef} className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative flex h-[16vw] w-full items-center justify-center">
          {Array.from({ length: WEDGE_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                pieceRefs.current[i] = el
              }}
              className="will-change-transform absolute inset-0 flex items-center justify-center"
              style={{ clipPath: wedgeClipPath(i) }}
            >
              <span
                ref={(el) => {
                  letsRefs.current[i] = el
                }}
                className="will-change-transform -mr-[1.3vw] font-display text-[11vw] font-bold leading-none text-paper"
              >
                Let&rsquo;s
              </span>
              <span
                ref={(el) => {
                  buildRefs.current[i] = el
                }}
                className="will-change-transform font-display text-[11vw] font-bold leading-none text-marigold"
              >
                build
              </span>
            </div>
          ))}
        </div>

        <p ref={taglineRef} className="-mt-4 font-sans text-lg italic tracking-wide text-paper/70">
          Where ambition meets execution
        </p>
      </div>
    </section>
    {/* Solid black buffer painted right at the pin boundary, overlapping
        whatever follows. Mobile browsers resize the real viewport by
        50-80px when the address bar shows/hides mid-scroll, which drifts
        GSAP's cached pin-spacer height away from the live h-dvh value —
        a fixed negative margin on the section itself couldn't reliably
        cover that. This strip takes zero net document space (equal
        negative top margin) and just paints over the seam regardless of
        how far the cached measurement has drifted. */}
    <div aria-hidden="true" className="pointer-events-none relative z-10 -mt-14 h-14 bg-black" />
    </>
  )
}
