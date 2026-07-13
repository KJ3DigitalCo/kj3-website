const TAU = Math.PI * 2

function starPoints(cx, cy, outerR, innerR) {
  const points = []
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = -Math.PI / 2 + (i * TAU) / 10
    points.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return points.join(' ')
}

function sunRays(cx, cy, outerR, innerR, count) {
  const rays = []
  for (let i = 0; i < count; i += 1) {
    const angle = (i * TAU) / count
    // Half the angle between rays, so adjacent ray bases meet with no gap.
    const half = TAU / count / 2
    const tipX = cx + outerR * Math.cos(angle)
    const tipY = cy + outerR * Math.sin(angle)
    const baseAX = cx + innerR * Math.cos(angle - half)
    const baseAY = cy + innerR * Math.sin(angle - half)
    const baseBX = cx + innerR * Math.cos(angle + half)
    const baseBY = cy + innerR * Math.sin(angle + half)
    rays.push(
      `M${baseAX.toFixed(2)},${baseAY.toFixed(2)} L${tipX.toFixed(2)},${tipY.toFixed(2)} L${baseBX.toFixed(2)},${baseBY.toFixed(2)} Z`,
    )
  }
  return rays
}

export default function PhilippineFlag({ className = '' }) {
  const triangleDepth = 86.6
  const sunCenter = { x: 30, y: 50 }

  return (
    <svg
      className={className}
      viewBox="0 0 200 100"
      preserveAspectRatio="xMinYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="200" height="50" fill="#0038a8" />
      <rect x="0" y="50" width="200" height="50" fill="#ce1126" />
      <polygon points={`0,0 0,100 ${triangleDepth},50`} fill="#ffffff" />

      {sunRays(sunCenter.x, sunCenter.y, 23, 7, 8).map((d, i) => (
        <path key={i} d={d} fill="#fcd116" />
      ))}
      <circle cx={sunCenter.x} cy={sunCenter.y} r="8.5" fill="#fcd116" />

      {/* Stars sit close to their corners, clear of the blue/red fields. */}
      <polygon points={starPoints(7, 12, 4.0, 1.65)} fill="#fcd116" />
      <polygon points={starPoints(7, 88, 4.0, 1.65)} fill="#fcd116" />
      <polygon points={starPoints(70, 50, 4.2, 1.75)} fill="#fcd116" />
    </svg>
  )
}
