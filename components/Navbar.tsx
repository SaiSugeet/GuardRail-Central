'use client'

import { useState, useEffect } from 'react'
import { APP_SHORT } from '@/lib/constants'

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

  const logoBox = (size: number, fontSize: number) => (
    <div style={{
      width: size, height: size, flexShrink: 0,
      border: '1.5px solid rgba(255,255,255,0.75)',
      display: 'grid', placeItems: 'center',
      fontWeight: 700, fontFamily: 'var(--font-rajdhani)',
      color: 'white', fontSize, letterSpacing: 1,
      background: 'rgba(255,255,255,0.08)',
    }}>
      {APP_SHORT}
    </div>
  )

  return (
    <nav style={{
      padding: '12px 28px',
      background: 'var(--ir-blue)',
      borderBottom: '3px solid var(--ir-orange)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* ── Desktop single-row layout ── */}
      <div className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {logoBox(38, 16)}
          <div style={{
            fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
            fontSize: 15, letterSpacing: 2.5, color: 'white',
          }}>
            GUARDRAIL CENTRAL · IRMS
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 14px',
          border: '1px solid rgba(255,255,255,0.35)',
          background: 'transparent',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: 2.5, color: 'white',
        }}>
          <span className="live-dot" />
          CENTRAL SAFETY OPERATIONS — LIVE
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: 1.5, color: 'rgba(255,255,255,0.75)',
        }}>
          <span>{dt} · {ts}</span>
          <span style={{
            color: 'white',
            borderLeft: '2px solid var(--ir-orange)',
            paddingLeft: 10,
          }}>OPR · {operator}</span>
          <button
            onClick={onLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.50)',
              color: 'rgba(255,255,255,0.85)',
              padding: '6px 12px',
              fontFamily: 'var(--font-rajdhani)', fontWeight: 600,
              fontSize: 11, letterSpacing: 2.5, cursor: 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'white'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.50)'
            }}
          >LOGOUT</button>
        </div>
      </div>

      {/* ── Mobile two-row layout ── */}
      <div className="navbar-mobile" style={{ display: 'none' }}>
        {/* Row 1: logo + title + logout */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {logoBox(32, 14)}
            <div style={{
              fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
              fontSize: 13, letterSpacing: 2, color: 'white',
            }}>
              GUARDRAIL CENTRAL
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.45)',
              color: 'white',
              padding: '5px 10px',
              fontFamily: 'var(--font-rajdhani)', fontWeight: 600,
              fontSize: 11, letterSpacing: 2, cursor: 'pointer',
            }}
          >LOGOUT</button>
        </div>
        {/* Row 2: live + operator + datetime */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          gap: 8, marginTop: 8, paddingTop: 8,
          borderTop: '1px solid rgba(255,255,255,0.18)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '3px 8px',
            border: '1px solid rgba(255,255,255,0.30)',
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5,
            color: 'white',
          }}>
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            CENTRAL SAFETY OPS — LIVE
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            letterSpacing: 1.5, color: 'white',
            borderLeft: '2px solid var(--ir-orange)', paddingLeft: 8,
          }}>OPR · {operator}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: 1, color: 'rgba(255,255,255,0.65)',
          }}>{dt} · {ts}</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile  { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
