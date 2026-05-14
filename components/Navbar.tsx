'use client'

import { useState, useEffect } from 'react'
import { APP_NAME, APP_SHORT } from '@/lib/constants'

interface Props {
  operator: string
  onLogout: () => void
}

function pad(n: number) { return String(n).padStart(2, '0') }

export default function Navbar({ operator, onLogout }: Props) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const dt = now.toISOString().slice(0, 10)

  return (
    <nav style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 28px',
      background: 'var(--ir-surface)',
      borderBottom: '1px solid var(--ir-border)',
      position: 'sticky', top: 0, zIndex: 50,
      flexWrap: 'wrap', gap: 10,
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 38, height: 38,
          border: '1.5px solid var(--ir-blue)',
          display: 'grid', placeItems: 'center',
          fontWeight: 700,
          fontFamily: 'var(--font-rajdhani)',
          color: 'var(--ir-blue-light)',
          fontSize: 16, letterSpacing: 1,
          position: 'relative',
        }}>
          {APP_SHORT}
          <span style={{
            position: 'absolute', bottom: -4,
            left: '20%', right: '20%',
            height: 2, background: 'var(--ir-orange)',
          }} />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 700, fontSize: 15,
            letterSpacing: 2.5,
          }}>
            GUARD<span style={{ color: 'var(--ir-blue-light)' }}>RAIL</span> CENTRAL · IRMS
          </div>
        </div>
      </div>

      {/* Center */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '6px 14px',
        border: '1px solid var(--ir-border)',
        background: 'rgba(0,200,83,0.05)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11, letterSpacing: 2.5,
      }}>
        <span className="live-dot" />
        CENTRAL SAFETY OPERATIONS — LIVE
      </div>

      {/* Right */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: 11, letterSpacing: 1.5,
        color: 'var(--ir-text-muted)',
      }}>
        <span>{dt} · {ts}</span>
        <span style={{
          color: 'var(--ir-text)',
          borderLeft: '2px solid var(--ir-orange)',
          paddingLeft: 10,
        }}>OPR · {operator}</span>
        <button
          onClick={onLogout}
          style={{
            background: 'transparent',
            border: '1px solid var(--ir-border)',
            color: 'var(--ir-text-muted)',
            padding: '6px 12px',
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 600, fontSize: 11,
            letterSpacing: 2.5,
            cursor: 'pointer',
            transition: 'all .15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ir-critical)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ir-critical)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ir-border)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ir-text-muted)'
          }}
        >LOGOUT</button>
      </div>
    </nav>
  )
}
