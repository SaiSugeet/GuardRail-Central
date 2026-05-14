'use client'

import { useState, useEffect } from 'react'
import { SCENARIOS } from '@/lib/constants'
import type { ScenarioKey } from '@/types'

interface Props { scenarioKey: ScenarioKey }

const WAVE_COLOR: Record<ScenarioKey, string> = {
  NORMAL:         '#1E88E5',
  JOINT_FAULT:    '#FFD600',
  LOOSE_FASTENER: '#FFD600',
  RAIL_CRACK:     '#FF6D00',
  SEVERE_DAMAGE:  '#FF5252',
}

const INTENSITY: Record<ScenarioKey, number> = {
  NORMAL:         0.18,
  JOINT_FAULT:    0.45,
  LOOSE_FASTENER: 0.38,
  RAIL_CRACK:     0.65,
  SEVERE_DAMAGE:  0.92,
}

export default function TrackStateIndicator({ scenarioKey }: Props) {
  const s = SCENARIOS[scenarioKey]
  const waveColor = WAVE_COLOR[scenarioKey]
  const intensity = INTENSITY[scenarioKey]
  const w = 200, h = 36

  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let id: number
    const tick = () => {
      setPhase(p => p + 0.18)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  const n = 60
  const pts: string[] = []
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * w
    const t = i * 0.35 + phase
    const noise = (Math.sin(t * 3.1) + Math.sin(t * 5.7 + 1.1) + Math.sin(t * 1.4 + 2.4)) / 3
    const burst = scenarioKey === 'SEVERE_DAMAGE' ? Math.sin(t * 11) * 0.5 : 0
    const y = h / 2 + (noise + burst) * (h * 0.45) * intensity
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }

  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          TRACK STATE
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 1.5, color: 'var(--ir-text-dim)', padding: '3px 7px', border: '1px solid var(--ir-border-soft)' }}>
          SCENARIO
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 700, fontSize: 24,
            letterSpacing: 3, lineHeight: 1.1,
            color: waveColor,
          }}>{s.label}</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11, letterSpacing: 1,
            color: 'var(--ir-text-muted)',
            lineHeight: 1.5, marginTop: 4,
          }}>{s.desc}</div>
        </div>

        <div style={{
          display: 'flex', gap: 12, alignItems: 'center',
          padding: 12,
          background: 'var(--ir-navy)',
          border: '1px solid var(--ir-border-soft)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5 }}>
            <span style={{ color: 'var(--ir-text-dim)' }}>EXPECTED IRMS</span>
            <span style={{ color: 'var(--ir-text)', fontSize: 13, marginTop: 2 }}>{s.expectedRange}</span>
          </div>
          <svg style={{ flex: 1, height: 36 }} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <polyline
              points={pts.join(' ')}
              fill="none" stroke={waveColor}
              strokeWidth="1.5" strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
