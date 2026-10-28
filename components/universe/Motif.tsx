import type { Universe } from '@/lib/data/projects'

/*
 * Motif signature de chaque univers, tracé à l'encre de la couleur d'accent courante.
 * fragments : bandes de texte découpées (citations) · mesh : nœuds et relations
 * wave : forme d'onde · grid : papier millimétré et courbe de capteur
 * layers : strates superposées (couches IT, intermediate, mart)
 */
export default function Motif({ kind, className = '' }: { kind: Universe; className?: string }) {
  if (kind === 'base') return null
  const stroke = 'rgb(var(--accent))'

  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {kind === 'fragments' &&
        [20, 62, 104, 146, 188, 230, 272].map((y, i) => (
          <g key={y} transform={`rotate(${i % 2 ? -1.5 : 1.2} 200 ${y})`}>
            <rect x={20 + (i * 37) % 90} y={y} width={140 + (i * 53) % 160} height={22} fill="none" stroke={stroke} strokeWidth="1" />
            <text x={28 + (i * 37) % 90} y={y + 15} fontSize="9" fontFamily="monospace" fill={stroke}>
              [{i + 1}]
            </text>
          </g>
        ))}

      {kind === 'mesh' && (
        <g stroke={stroke} strokeWidth="0.8" fill="none">
          {[
            [40, 60, 150, 40], [150, 40, 260, 90], [260, 90, 360, 50], [40, 60, 90, 170], [90, 170, 200, 150],
            [200, 150, 260, 90], [200, 150, 310, 200], [310, 200, 360, 50], [90, 170, 140, 260], [140, 260, 250, 250],
            [250, 250, 310, 200], [150, 40, 200, 150],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          {[[40, 60], [150, 40], [260, 90], [360, 50], [90, 170], [200, 150], [310, 200], [140, 260], [250, 250]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 6 : 3.5} fill="rgb(var(--paper))" />
          ))}
        </g>
      )}

      {kind === 'wave' && (
        <g fill={stroke}>
          {Array.from({ length: 64 }).map((_, i) => {
            // Arrondi : le serveur et le navigateur doivent produire exactement les mêmes valeurs
            const h = Math.round(10 + Math.abs(Math.sin(i * 0.45) * Math.cos(i * 0.13)) * 150)
            return <rect key={i} x={i * 6.25} y={150 - h / 2} width={2} height={h} />
          })}
        </g>
      )}

      {kind === 'layers' && (
        <g fill="none" stroke={stroke}>
          {[60, 130, 200].map((y, i) => (
            <g key={y}>
              <rect x={30 + i * 30} y={y} width={340 - i * 60} height={46} strokeWidth={1.2} />
              {Array.from({ length: 8 - i * 2 }).map((_, j) => (
                <line key={j} x1={50 + i * 30 + j * 40} y1={y + 46} x2={70 + (i + 1) * 30 + j * 32} y2={y + 70} strokeWidth={0.6} />
              ))}
            </g>
          ))}
        </g>
      )}

      {kind === 'grid' && (
        <g fill="none">
          {Array.from({ length: 21 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={300} stroke={stroke} strokeWidth={i % 5 ? 0.3 : 0.8} />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 20} x2={400} y2={i * 20} stroke={stroke} strokeWidth={i % 5 ? 0.3 : 0.8} />
          ))}
          <path
            d="M0 210 C 40 200, 60 120, 100 140 S 160 230, 200 170 S 260 80, 300 120 S 360 190, 400 150"
            stroke={stroke}
            strokeWidth="2"
          />
        </g>
      )}
    </svg>
  )
}
