'use client'

import { useState, useEffect } from 'react'
import { AUTH_CREDENTIALS, APP_NAME, APP_SHORT, APP_TAGLINE } from '@/lib/constants'

interface Props {
  onAuth: (username: string) => void
}

export default function LoginPage({ onAuth }: Props) {
  const [user, setUser]     = useState('')
  const [pw, setPw]         = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError]   = useState('')
  const [now, setNow]       = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (user.trim() === AUTH_CREDENTIALS.username && pw === AUTH_CREDENTIALS.password) {
      setError('')
      onAuth(user.trim())
    } else {
      setError('Invalid credentials. Access denied.')
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const tsStr = `${now.toISOString().slice(0, 10)}  ·  ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} IST`

  return (
    <div className="login-root" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      background: 'var(--ir-bg)',
    }}>
      {/* LEFT — blue panel */}
      <div className="login-left" style={{
        position: 'relative',
        padding: '56px 64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'var(--ir-blue)',
        overflow: 'hidden',
      }}>
        <div className="diagonal-bg" />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative', zIndex: 2 }}>
          <div style={{
            width: 60, height: 60, flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.8)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 26,
            letterSpacing: 1, color: 'white',
            background: 'rgba(255,255,255,0.08)',
          }}>
            {APP_SHORT}
          </div>
          <div>
            <div className="login-brand-name" style={{
              fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
              fontSize: 22, letterSpacing: 4, color: 'white',
            }}>{APP_NAME}</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: 2, color: 'rgba(255,255,255,0.6)',
              marginTop: 4,
            }}>{APP_TAGLINE}</div>
          </div>
        </div>

        {/* Hero */}
        <div className="login-hero" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4,
            color: 'rgba(255,255,255,0.55)', marginBottom: 14,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 2, background: 'var(--ir-orange)', display: 'block' }} />
            PHASE-01 STUDENT PROTOTYPE
          </div>
          <h1 className="login-hero-title" style={{
            fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 50,
            lineHeight: 1.06, letterSpacing: -0.5,
            margin: '0 0 18px', maxWidth: 620, color: 'white',
            wordBreak: 'break-word', overflowWrap: 'anywhere',
          }}>
            IIOT-Integrated Edge-AI<br />
            Railway Track Health<br />
            Monitoring &amp; Supervision
          </h1>
          <p className="login-desc" style={{
            fontFamily: 'var(--font-rajdhani)', fontSize: 17,
            color: 'rgba(255,255,255,0.70)',
            margin: '0 0 28px', maxWidth: 520, lineHeight: 1.55,
          }}>
            Real-time vibration, obstacle and infrastructure-risk telemetry
            from on-board sensors to a central safety operations console.
          </p>
          <div className="login-college" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 14px',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: 1.5, color: 'rgba(255,255,255,0.65)',
          }}>
            <span style={{
              width: 6, height: 6, background: 'var(--ir-orange)',
              borderRadius: '50%', display: 'block', flexShrink: 0,
            }} />
            NEW HORIZON COLLEGE OF ENGINEERING · BENGALURU
          </div>
        </div>

        {/* Meta */}
        <div className="login-meta" style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: 32,
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          letterSpacing: 1.5, color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
        }}>
          {[
            { label: 'SYSTEM TIME', value: tsStr },
            { label: 'NODE', value: 'NHC-CSO-01 / SECURE' },
            { label: 'STATUS', value: 'READY FOR OPERATOR' },
          ].map(({ label, value }) => (
            <span key={label}>
              {label}
              <strong style={{
                display: 'block', color: 'rgba(255,255,255,0.7)',
                fontWeight: 500, marginTop: 4,
              }}>{value}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — login form */}
      <div className="login-right" style={{
        display: 'grid', placeItems: 'center',
        padding: 32,
        background: 'var(--ir-bg)',
      }}>
        <form onSubmit={submit} style={{
          width: '100%', maxWidth: 380,
          background: 'var(--ir-surface)',
          border: '1px solid var(--ir-border)',
          padding: '36px 32px 28px',
          boxShadow: 'var(--ir-shadow-md)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
            fontSize: 22, letterSpacing: 5, margin: '0 0 4px',
            color: 'var(--ir-blue)',
          }}>OPERATOR LOGIN</h2>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5,
            letterSpacing: 2, color: 'var(--ir-text-dim)',
            marginBottom: 28,
          }}>AUTHORIZED PERSONNEL ONLY</div>

          {error && (
            <div style={{
              background: 'var(--ir-critical-bg)',
              borderLeft: '3px solid var(--ir-critical)',
              color: 'var(--ir-critical)',
              padding: '10px 12px',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: 1, marginBottom: 14,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                display: 'grid', placeItems: 'center',
                width: 18, height: 18,
                background: 'var(--ir-critical)', color: 'white',
                fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
                fontSize: 12, flexShrink: 0,
              }}>!</span>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block', fontFamily: 'var(--font-mono)',
              fontSize: 10, letterSpacing: 2,
              color: 'var(--ir-text-dim)', marginBottom: 6,
            }}>OPERATOR ID</label>
            <input
              type="text" autoComplete="off" value={user}
              onChange={e => setUser(e.target.value)} placeholder="enter operator id"
              style={{
                width: '100%', background: 'white',
                border: '1px solid var(--ir-border)',
                color: 'var(--ir-text)', padding: '12px 14px',
                fontFamily: 'var(--font-mono)', fontSize: 14,
                letterSpacing: 1, outline: 'none',
                transition: 'border-color .15s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--ir-blue-mid)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--ir-border)')}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block', fontFamily: 'var(--font-mono)',
              fontSize: 10, letterSpacing: 2,
              color: 'var(--ir-text-dim)', marginBottom: 6,
            }}>ACCESS CODE</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'} value={pw}
                onChange={e => setPw(e.target.value)} placeholder="••••••••"
                style={{
                  width: '100%', background: 'white',
                  border: '1px solid var(--ir-border)',
                  color: 'var(--ir-text)', padding: '12px 60px 12px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: 14,
                  letterSpacing: 1, outline: 'none',
                  transition: 'border-color .15s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--ir-blue-mid)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--ir-border)')}
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                style={{
                  position: 'absolute', right: 10, top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', color: 'var(--ir-text-dim)',
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: 1.5, padding: '4px 8px', cursor: 'pointer',
                }}
              >{showPw ? 'HIDE' : 'SHOW'}</button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%', background: 'var(--ir-blue)', color: 'white',
              border: 'none', padding: 14, marginTop: 6,
              fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
              fontSize: 14, letterSpacing: 5, cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--ir-blue-deep)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ir-blue)')}
          >
            AUTHENTICATE
          </button>

          <div style={{
            marginTop: 22, textAlign: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            letterSpacing: 2, color: 'var(--ir-text-dim)',
          }}>
            RAIL SAFETY DIVISION · SECURE ACCESS · TLS 1.3
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .login-root {
            grid-template-columns: 1fr !important;
          }
          .login-left {
            height: 180px !important;
            padding: 24px 20px !important;
            justify-content: flex-start !important;
            gap: 0 !important;
          }
          .login-hero, .login-meta, .login-desc, .login-college { display: none !important; }
          .login-brand-name {
            font-size: 17px !important;
            letter-spacing: 2px !important;
          }
          .login-right {
            padding: 20px 16px 32px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  )
}
