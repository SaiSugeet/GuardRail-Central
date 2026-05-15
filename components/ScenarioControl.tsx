'use client'

import { SCENARIOS, SCENARIO_ORDER } from '@/lib/constants'
import type { ScenarioKey } from '@/types'

interface Props {
  scenario: ScenarioKey
  setScenario: (s: ScenarioKey) => void
}

const TONE_INACTIVE: Record<string, React.CSSProperties> = {
  blue:   { borderColor: 'rgba(30,136,229,0.5)', color: 'var(--ir-text-muted)' },
  yellow: { borderColor: 'rgba(255,214,0,0.45)', color: '#E2C84A' },
  orange: { borderColor: 'rgba(255,109,0,0.6)',  color: '#F4A064' },
  red:    { borderColor: 'rgba(213,0,0,0.65)',   color: '#FF6B6B' },
}

export default function ScenarioControl({ scenario, setScenario }: Props) {
  return (
    <div className="section-in scenario-root" style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      padding: '14px 18px',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: 18,
      alignItems: 'center',
    }}>
      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-rajdhani)',
        fontWeight: 600, fontSize: 12,
        letterSpacing: 3, color: 'var(--ir-text-muted)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ width: 16, height: 2, background: 'var(--ir-orange)', display: 'block' }} />
        TRACK SCENARIO CONTROL
      </div>

      {/* Buttons */}
      <div className="scenario-buttons" style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
        {SCENARIO_ORDER.map(key => {
          const s = SCENARIOS[key]
          const isActive = scenario === key
          let activeClass = ''
          if (isActive) {
            if (s.color === 'blue')   activeClass = 'sc-btn-active-blue'
            if (s.color === 'yellow') activeClass = 'sc-btn-active-yellow'
            if (s.color === 'orange') activeClass = 'sc-btn-active-orange'
            if (s.color === 'red')    activeClass = 'sc-btn-active-red'
          }
          return (
            <button
              key={key}
              className={activeClass}
              onClick={() => setScenario(key)}
              style={{
                background: 'transparent',
                border: '1px solid var(--ir-border)',
                padding: '9px 16px',
                fontFamily: 'var(--font-rajdhani)',
                fontWeight: 600, fontSize: 12,
                letterSpacing: 2,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all .2s',
                ...(!isActive ? TONE_INACTIVE[s.color] : {}),
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Active label */}
      <div className="scenario-active" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2,
        borderLeft: '1px solid var(--ir-border)',
        paddingLeft: 18,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: 2, color: 'var(--ir-text-dim)',
        }}>ACTIVE SCENARIO</div>
        <div style={{
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 700, fontSize: 18,
          letterSpacing: 3,
        }}>{SCENARIOS[scenario].label}</div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .scenario-root {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            padding: 12px !important;
          }
          .scenario-buttons {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            overflow-x: visible !important;
          }
          .scenario-buttons button { padding: 8px 10px !important; font-size: 11px !important; }
          .scenario-active {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--ir-border-soft) !important;
            padding-top: 8px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  )
}
