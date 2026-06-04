'use client'

import { useRef, useEffect } from 'react'
import type { ObstacleEvent } from '@/types'

interface Props { log: ObstacleEvent[] }

function pad(n: number) { return String(n).padStart(2, '0') }
function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const CLS_COLOR: Record<string, string> = {
  CLEAR:  'var(--ir-text-dim)',
  CATTLE: 'var(--ir-monitor)',
  PERSON: 'var(--ir-critical)',
  DEBRIS: 'var(--ir-alert)',
}

const CLS_ROW_BG: Record<string, string> = {
  CATTLE: 'var(--ir-monitor-bg)',
  PERSON: 'var(--ir-critical-bg)',
  DEBRIS: 'var(--ir-alert-bg)',
}

const CLS_BORDER: Record<string, string> = {
  CATTLE: 'var(--ir-monitor)',
  PERSON: 'var(--ir-critical)',
  DEBRIS: 'var(--ir-alert)',
}

export default function ObstacleLog({ log }: Props) {
  const firstId = log[0]?.id
  const prevFirstId = useRef<string | undefined>(undefined)
  const flashRef = useRef<HTMLTableRowElement | null>(null)

  useEffect(() => {
    if (firstId && firstId !== prevFirstId.current && flashRef.current) {
      flashRef.current.classList.remove('row-flash')
      void flashRef.current.offsetWidth
      flashRef.current.classList.add('row-flash')
      prevFirstId.current = firstId
    }
  }, [firstId])

  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      boxShadow: 'var(--ir-shadow-sm)',
      padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          OBSTACLE DETECTION LOG
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: 1.5, color: 'var(--ir-text-dim)',
          padding: '3px 7px',
          background: 'var(--ir-surface-2)',
          border: '1px solid var(--ir-border)',
        }}>
          YOLO-NANO · EDGE
        </div>
      </div>

      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          <thead>
            <tr style={{ background: 'var(--ir-surface-3)' }}>
              {['TIME', 'CLASS', 'CONFIDENCE', 'STATUS'].map((h, i) => (
                <th key={h} style={{
                  textAlign: 'left', fontWeight: 600,
                  letterSpacing: 2, color: 'var(--ir-text-secondary)',
                  padding: '8px 10px',
                  borderBottom: '1px solid var(--ir-border)',
                  fontSize: 9.5,
                  fontFamily: 'var(--font-rajdhani)',
                  width: i === 0 ? 90 : i === 3 ? 80 : undefined,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {log.map((row, i) => {
              const isEvent = row.obstacleClass !== 'CLEAR'
              const confPct = (row.confidence * 100).toFixed(1)
              const confBarColor = isEvent ? CLS_BORDER[row.obstacleClass] ?? 'var(--ir-alert)' : 'var(--ir-blue-mid)'
              const rowBg = isEvent ? CLS_ROW_BG[row.obstacleClass] ?? 'var(--ir-alert-bg)' : 'transparent'
              const rowBorderLeft = isEvent ? `3px solid ${CLS_BORDER[row.obstacleClass] ?? 'var(--ir-alert)'}` : '3px solid transparent'

              return (
                <tr
                  key={row.id}
                  ref={i === 0 ? flashRef : undefined}
                  style={{
                    background: rowBg,
                    borderLeft: rowBorderLeft,
                  }}
                >
                  <td style={{
                    padding: '9px 10px',
                    borderBottom: '1px solid var(--ir-border-light)',
                    color: 'var(--ir-text-dim)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {fmtTime(row.timestamp)}
                  </td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid var(--ir-border-light)' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 7px',
                      fontSize: 10, letterSpacing: 1.5,
                      fontWeight: isEvent ? 600 : 400,
                      color: CLS_COLOR[row.obstacleClass],
                    }}>{row.obstacleClass}</span>
                  </td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid var(--ir-border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        flex: 1, height: 4,
                        background: 'var(--ir-surface-2)',
                        position: 'relative',
                        minWidth: 60, maxWidth: 90,
                      }}>
                        <div style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0,
                          width: confPct + '%',
                          background: confBarColor,
                        }} />
                      </div>
                      <span style={{ color: 'var(--ir-text-dim)', fontSize: 10 }}>{confPct}%</span>
                    </div>
                  </td>
                  <td style={{
                    padding: '9px 10px',
                    borderBottom: '1px solid var(--ir-border-light)',
                    color: isEvent ? CLS_BORDER[row.obstacleClass] ?? 'var(--ir-alert)' : 'var(--ir-text-dim)',
                    fontWeight: isEvent ? 600 : 400,
                  }}>
                    {isEvent ? 'FLAG' : 'OK'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
