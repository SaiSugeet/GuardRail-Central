'use client'

import { RISK_COLORS } from '@/lib/constants'
import type { RiskClass } from '@/types'

interface Props { value: number; riskClass: RiskClass }

export default function IRMSGauge({ value, riskClass }: Props) {
  const size = 240
  const cx = size / 2
  const cy = size * 0.62
  const r  = 88

  const startA = Math.PI
  const endA   = 2 * Math.PI

  const arc = (frac: number): [number, number] => {
    const a = startA + (endA - startA) * frac
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }

  const segPath = (f0: number, f1: number) => {
    const [x0, y0] = arc(f0)
    const [x1, y1] = arc(f1)
    return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`
  }

  const v     = Math.max(0, Math.min(100, value))
  const frac  = v / 100
  const color = RISK_COLORS[riskClass]

  const [needleX, needleY] = arc(frac)

  const tickAt = (f: number) => {
    const a = startA + (endA - startA) * f
    return {
      x1: cx + (r - 4) * Math.cos(a), y1: cy + (r - 4) * Math.sin(a),
      x2: cx + (r + 8) * Math.cos(a), y2: cy + (r + 8) * Math.sin(a),
    }
  }

  const segments = [
    { from: 0,    to: 0.25, color: '#00C853' },
    { from: 0.25, to: 0.50, color: '#FFD600' },
    { from: 0.50, to: 0.75, color: '#FF6D00' },
    { from: 0.75, to: 1.00, color: '#D50000' },
  ]

  const svgH = size * 0.78

  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          IRMS GAUGE
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 1.5, color: 'var(--ir-text-dim)', padding: '3px 7px', border: '1px solid var(--ir-border-soft)' }}>
          REAL-TIME
        </div>
      </div>

      {/* Digital Readout Box */}
      <div className="irms-readout" style={{
        background: 'var(--ir-surface-2)',
        border: '1px solid var(--ir-border)',
        borderRadius: 8,
        padding: '14px 20px',
        textAlign: 'center',
        marginBottom: 10,
      }}>
        <div className="irms-number" style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1,
          letterSpacing: -1,
          color,
          transition: 'color .4s',
        }}>{v.toFixed(1)}</div>
        <div style={{
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 3,
          color,
          marginTop: 6,
          opacity: 0.9,
        }}>{riskClass}</div>
      </div>

      {/* SVG Arc */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          viewBox={`0 0 ${size} ${svgH}`}
          style={{ display: 'block', width: '100%', maxWidth: size, height: 'auto' }}
        >
          {/* Track */}
          <path
            d={`M ${arc(0)[0]} ${arc(0)[1]} A ${r} ${r} 0 0 1 ${arc(1)[0]} ${arc(1)[1]}`}
            stroke="#182438" strokeWidth="14" fill="none" strokeLinecap="butt"
          />
          {/* Colored segments */}
          {segments.map((s, i) => (
            <path
              key={i}
              d={segPath(s.from, s.to)}
              stroke={s.color} strokeWidth="14" fill="none"
              opacity={frac >= s.from ? 0.95 : 0.18}
              style={{ transition: 'opacity .4s' }}
            />
          ))}
          {/* Ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
            const t = tickAt(f)
            return <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#5A6785" strokeWidth="1.2" />
          })}
          {/* Labels */}
          {[0, 25, 50, 75, 100].map((n, i) => {
            const a = startA + (endA - startA) * (n / 100)
            const lr = r + 22
            return (
              <text key={i} x={cx + lr * Math.cos(a)} y={cy + lr * Math.sin(a)}
                fontFamily="var(--font-mono)" fontSize="10"
                fill="#5A6785" textAnchor="middle" dominantBaseline="middle">
                {n}
              </text>
            )
          })}
          {/* Needle */}
          <g style={{ transition: 'all .6s cubic-bezier(.5,.1,.3,1)' }}>
            <line x1={cx} y1={cy} x2={needleX} y2={needleY}
              stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="7" fill={color} />
            <circle cx={cx} cy={cy} r="3" fill="#0A0F1E" />
          </g>
        </svg>
      </div>

      {/* Caption */}
      <div style={{
        fontFamily: 'var(--font-rajdhani)', fontWeight: 500,
        fontSize: 12, letterSpacing: 2,
        color: 'var(--ir-text-muted)',
        textAlign: 'center', marginTop: 6,
      }}>Infrastructure Risk Monitoring Score</div>

      <style>{`
        @media (max-width: 767px) {
          .irms-readout { padding: 10px 14px !important; }
          .irms-number  { font-size: 38px !important; }
        }
      `}</style>
    </div>
  )
}
