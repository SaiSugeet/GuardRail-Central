'use client'

import { useRef, useEffect } from 'react'
import type { ObstacleEvent } from '@/types'

interface Props { log: ObstacleEvent[] }

function pad(n: number) { return String(n).padStart(2, '0') }
function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const CLS_COLOR: Record<string, string> = {
  CLEAR:  'var(--ir-text-muted)',
  CATTLE: '#F4A064',
  PERSON: '#FF6B6B',
  DEBRIS: 'var(--ir-orange-light)',
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
      padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          OBSTACLE DETECTION LOG
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 1.5, color: 'var(--ir-text-dim)', padding: '3px 7px', border: '1px solid var(--ir-border-soft)' }}>
          YOLO-NANO · EDGE
        </div>
      </div>

      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          <thead>
            <tr>
              {['TIME', 'CLASS', 'CONFIDENCE', 'STATUS'].map((h, i) => (
                <th key={h} style={{
                  textAlign: 'left', fontWeight: 500,
                  letterSpacing: 2, color: 'var(--ir-text-dim)',
                  padding: '8px 10px',
                  borderBottom: '1px solid var(--ir-border)',
                  fontSize: 9.5,
                  width: i === 0 ? 90 : i === 3 ? 80 : undefined,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {log.map((row, i) => {
              const isEvent = row.obstacleClass !== 'CLEAR'
              const confPct = (row.confidence * 100).toFixed(1)
              const confBarColor =
                row.obstacleClass === 'PERSON' || row.obstacleClass === 'CATTLE' ? 'var(--ir-critical)' :
                isEvent ? 'var(--ir-orange-light)' :
                'var(--ir-blue-light)'

              return (
                <tr
                  key={row.id}
                  ref={i === 0 ? flashRef : undefined}
                  style={{
                    color: isEvent ? 'var(--ir-orange-light)' : 'var(--ir-text)',
                    fontWeight: isEvent ? 600 : 400,
                  }}
                >
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid var(--ir-border-soft)', color: 'var(--ir-text)' }}>
                    {fmtTime(row.timestamp)}
                  </td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid var(--ir-border-soft)' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 7px',
                      fontSize: 10, letterSpacing: 1.5,
                      color: CLS_COLOR[row.obstacleClass],
                    }}>{row.obstacleClass}</span>
                  </td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid var(--ir-border-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        flex: 1, height: 4,
                        background: 'var(--ir-surface-3)',
                        position: 'relative',
                        minWidth: 60, maxWidth: 90,
                      }}>
                        <div style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0,
                          width: confPct + '%',
                          background: confBarColor,
                        }} />
                      </div>
                      <span style={{ color: 'var(--ir-text-muted)', fontSize: 10 }}>{confPct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid var(--ir-border-soft)' }}>
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
