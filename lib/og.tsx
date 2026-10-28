import type { Universe } from './data/projects'

// Images de partage (LinkedIn, messageries) : même papier, même encre, motif et couleur de l'univers.
// Le rendu passe par Satori : couleurs en hexadécimal, pas de variables CSS.

export const OG_SIZE = { width: 1200, height: 630 }
const PAPER = '#EDE8DE'
const INK = '#1A1712'
const MUTED = '#665F53'

export const UNIVERSE_HEX: Record<Universe, string> = {
  fragments: '#B3321A',
  mesh: '#2F5D50',
  wave: '#8A5A00',
  grid: '#2B4C6F',
  layers: '#3E5560',
  base: '#B3321A',
}

// Fraunces complète en TTF (Satori ne lit pas le woff2) ; si le téléchargement échoue, police par défaut
export async function loadFraunces() {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@144,300`)
    ).text()
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (!url) return []
    const data = await (await fetch(url)).arrayBuffer()
    return [{ name: 'Fraunces', data, weight: 300 as const, style: 'normal' as const }]
  } catch {
    return []
  }
}

function Motif({ kind, color }: { kind: Universe; color: string }) {
  if (kind === 'mesh') {
    const pts = [[60, 80], [210, 50], [340, 140], [120, 250], [270, 300], [400, 260], [180, 420], [360, 430]]
    const links = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [2, 5], [4, 5], [3, 6], [6, 7], [5, 7], [4, 7]]
    return (
      <svg width="460" height="500" viewBox="0 0 460 500">
        {links.map(([a, b], i) => (
          <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={color} strokeWidth="2" />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 12 : 7} fill={PAPER} stroke={color} strokeWidth="2" />
        ))}
      </svg>
    )
  }
  if (kind === 'wave') {
    return (
      <svg width="460" height="500" viewBox="0 0 460 500">
        {Array.from({ length: 30 }).map((_, i) => {
          const h = Math.round(30 + Math.abs(Math.sin(i * 0.45) * Math.cos(i * 0.13)) * 380)
          return <rect key={i} x={i * 15} y={250 - h / 2} width="6" height={h} fill={color} />
        })}
      </svg>
    )
  }
  if (kind === 'grid') {
    return (
      <svg width="460" height="500" viewBox="0 0 460 500">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="500" stroke={color} strokeWidth={i % 5 ? 0.6 : 1.6} />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="460" y2={i * 40} stroke={color} strokeWidth={i % 5 ? 0.6 : 1.6} />
        ))}
        <path d="M0 340 C 60 320, 90 180, 150 210 S 240 360, 300 270 S 400 120, 460 190" fill="none" stroke={color} strokeWidth="5" />
      </svg>
    )
  }
  if (kind === 'layers') {
    return (
      <svg width="460" height="500" viewBox="0 0 460 500">
        {[80, 200, 320].map((y, i) => (
          <rect key={y} x={40 + i * 40} y={y} width={380 - i * 80} height="80" fill="none" stroke={color} strokeWidth="3" />
        ))}
      </svg>
    )
  }
  if (kind === 'fragments') {
    return (
      <svg width="460" height="500" viewBox="0 0 460 500">
        {[30, 100, 170, 240, 310, 380].map((y, i) => (
          <rect key={y} x={20 + ((i * 47) % 110)} y={y} width={200 + ((i * 61) % 180)} height="42" fill="none" stroke={color} strokeWidth="2" />
        ))}
      </svg>
    )
  }
  return <div style={{ display: 'flex', width: 24, height: 500, background: color }} />
}

export function OgCard({
  eyebrow,
  title,
  footer,
  metric,
  universe,
}: {
  eyebrow: string
  title: string
  footer: string
  metric?: { value: string; label: string }
  universe: Universe
}) {
  const accent = UNIVERSE_HEX[universe]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: PAPER, color: INK, padding: 64, position: 'relative' }}>
      <div style={{ position: 'absolute', right: 20, top: 40, display: 'flex', opacity: 0.4 }}>
        <Motif kind={universe} color={accent} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: MUTED }}>
          <div style={{ display: 'flex', width: 14, height: 14, background: accent, marginRight: 16, marginTop: 6 }} />
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: title.length > 26 ? 84 : 108, lineHeight: 0.95, letterSpacing: -3, maxWidth: 700 }}>
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 40, borderTop: `2px solid ${INK}`, paddingTop: 24 }}>
            <div style={{ display: 'flex', fontSize: 24, color: MUTED }}>{footer}</div>
            {metric && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: 64, color: accent, lineHeight: 1 }}>{metric.value}</div>
                <div style={{ display: 'flex', fontSize: 18, color: MUTED, textTransform: 'uppercase', letterSpacing: 2 }}>{metric.label}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
