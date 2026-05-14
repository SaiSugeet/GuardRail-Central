'use client'

import { RISK_COLORS, RISK_RANGES } from '@/lib/constants'
import type { RiskClass } from '@/types'

interface Props { riskClass: RiskClass }

export default function RiskBadge({ riskClass }: Props) {
  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          RISK CLASSIFICATION
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 1.5, color: 'var(--ir-text-dim)', padding: '3px 7px', border: '1px solid var(--ir-border-soft)' }}>
          AUTO-GRADE
        </div>
      </div>

      <div
        className={`badge-${riskClass.toLowerCase()}`}
        style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 18,
          position: 'relative',
          textAlign: 'center',
          border: '1px solid',
          transition: 'all .3s',
        }}
      >
        {/* Corners */}
        {[
          { top: 6, left: 6, borderRight: 'none', borderBottom: 'none' },
          { top: 6, right: 6, borderLeft: 'none', borderBottom: 'none' },
          { bottom: 6, left: 6, borderRight: 'none', borderTop: 'none' },
          { bottom: 6, right: 6, borderLeft: 'none', borderTop: 'none' },
        ].map((style, i) => (
          <span key={i} style={{
            position: 'absolute',
            width: 14, height: 14,
            border: '2px solid currentColor',
            opacity: 0.6,
            ...style,
          }} />
        ))}

        <div style={{
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 700, fontSize: 48,
          letterSpacing: 6, lineHeight: 1,
        }}>{riskClass}</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11, letterSpacing: 2,
          marginTop: 14, opacity: 0.7,
        }}>IRMS · {RISK_RANGES[riskClass]}</div>
      </div>
    </div>
  )
}
