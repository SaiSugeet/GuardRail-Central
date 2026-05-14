'use client'

import type { SystemStats } from '@/types'

interface Props { stats: SystemStats }

function pad(n: number) { return String(n).padStart(2, '0') }
function fmtUptime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function SystemHealth({ stats }: Props) {
  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          SYSTEM HEALTH
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 1.5, color: 'var(--ir-text-dim)', padding: '3px 7px', border: '1px solid var(--ir-border-soft)' }}>
          EDGE + SERVER
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { k: 'PACKETS PROCESSED', v: stats.packetsProcessed.toLocaleString() },
          { k: 'SCENARIO UPTIME',   v: fmtUptime(stats.scenarioUptime) },
          { k: 'API RESPONSE',      v: `${stats.apiResponse} ms` },
          { k: 'MODEL CONFIDENCE',  v: `${stats.modelConfidence.toFixed(1)} %` },
        ].map(({ k, v }) => (
          <div key={k} style={{
            background: 'var(--ir-navy)',
            border: '1px solid var(--ir-border-soft)',
            padding: 12,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 2, color: 'var(--ir-text-dim)' }}>{k}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, marginTop: 6, color: 'var(--ir-text)' }}>{v}</div>
          </div>
        ))}

        {/* Full-width formula cell */}
        <div style={{
          gridColumn: 'span 2',
          background: 'var(--ir-navy)',
          border: '1px solid var(--ir-border-soft)',
          padding: 12,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 2, color: 'var(--ir-text-dim)' }}>
            IRMS COMPOSITION (LIVE)
          </div>
          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            marginTop: 6,
          }}>
            {[
              { label: 'VIB',  val: stats.vibrationComponent.toFixed(1) },
              { label: 'OBST', val: stats.obstacleComponent.toFixed(1) },
              { label: 'COMM', val: stats.communicationComponent.toFixed(1) },
              { label: '=',    val: (stats.vibrationComponent + stats.obstacleComponent + stats.communicationComponent).toFixed(1) },
            ].map(({ label, val }) => (
              <span key={label}>
                {label} <b style={{ color: 'var(--ir-blue-light)', fontWeight: 500 }}>{val}</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 14,
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: 1.5, color: 'var(--ir-text-dim)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 6, height: 6, background: 'var(--ir-orange)',
          display: 'inline-block', borderRadius: '50%',
          animation: 'pulseDot 2s ease-in-out infinite',
        }} />
        SYNTHETIC DATA SIMULATION ACTIVE · NO LIVE TELEMETRY
      </div>
    </div>
  )
}
