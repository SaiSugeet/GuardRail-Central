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
      background: 'var(--ir-navy)',
      position: 'relative',
    }}>
      {/* LEFT */}
      <div className="login-left" style={{
        position: 'relative',
        padding: '64px 72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid var(--ir-border-soft)',
        overflow: 'hidden',
      }}>
        <div className="grid-bg" />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
          <div style={{
            width: 64, height: 64, flexShrink: 0,
            border: '2px solid var(--ir-blue)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 28,
            letterSpacing: 1, color: 'var(--ir-blue-light)',
            background: 'linear-gradient(135deg, rgba(21,101,192,0.08), transparent), var(--ir-surface)',
            position: 'relative',
          }}>
            {APP_SHORT}
            <span style={{ position: 'absolute', left: '12%', right: '12%', bottom: -8, height: 3, background: 'var(--ir-orange)' }} />
          </div>
          <div>
            <div className="login-brand-name" style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 22, letterSpacing: 4 }}>{APP_NAME}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ir-text-muted)', marginTop: 4 }}>{APP_TAGLINE}</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--ir-orange-light)', marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 2, background: 'var(--ir-orange)', display: 'block' }} />
            PHASE-01 STUDENT PROTOTYPE
          </div>
          <h1 className="login-hero-title" style={{
            fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 54,
            lineHeight: 1.04, letterSpacing: -0.5,
            margin: '0 0 18px', maxWidth: 620,
            wordBreak: 'break-word', overflowWrap: 'anywhere',
          }}>
            IIOT-Integrated <span style={{ color: 'var(--ir-blue-light)' }}>Edge-AI</span><br />
            Railway Track Health<br />
            Monitoring &amp; Supervision
          </h1>
          <p className="login-desc" style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 18, color: 'var(--ir-text-muted)', margin: '0 0 28px', maxWidth: 540 }}>
            Real-time vibration, obstacle and infrastructure-risk telemetry
            from on-board sensors to a central safety operations console.
          </p>
          <div className="login-college" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', border: '1px solid var(--ir-border)', background: 'rgba(21,101,192,0.06)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, color: 'var(--ir-text-muted)' }}>
            <span style={{ width: 6, height: 6, background: 'var(--ir-orange)', borderRadius: '50%', display: 'block', flexShrink: 0 }} />
            NEW HORIZON COLLEGE OF ENGINEERING · BENGALURU
          </div>
        </div>

        {/* Meta */}
        <div className="login-meta" style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 32, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: 1.5, color: 'var(--ir-text-dim)', textTransform: 'uppercase' }}>
          {[
            { label: 'SYSTEM TIME', value: tsStr },
            { label: 'NODE', value: 'NHC-CSO-01 / SECURE' },
            { label: 'STATUS', value: 'READY FOR OPERATOR' },
          ].map(({ label, value }) => (
            <span key={label}>
              {label}
              <strong style={{ display: 'block', color: 'var(--ir-text-muted)', fontWeight: 500, marginTop: 4 }}>{value}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right" style={{
        display: 'grid', placeItems: 'center',
        padding: 32,
        background: 'radial-gradient(circle at 50% 30%, var(--ir-glow-blue), transparent 60%), var(--ir-navy)',
      }}>
        <form onSubmit={submit} style={{
          width: '100%', maxWidth: 380,
          background: 'var(--ir-surface-2)',
          border: '1px solid var(--ir-border)',
          padding: '36px 32px 28px',
          position: 'relative',
          boxShadow: '0 0 0 1px rgba(21,101,192,0.08), 0 30px 60px -20px rgba(0,0,0,0.6), 0 0 80px -20px var(--ir-glow-blue)',
        }}>
          <span style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 2, background: 'linear-gradient(90deg, transparent, var(--ir-blue) 30%, var(--ir-orange) 70%, transparent)' }} />

          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 22, letterSpacing: 5, margin: '0 0 4px' }}>OPERATOR LOGIN</h2>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: 2, color: 'var(--ir-text-muted)', marginBottom: 28 }}>AUTHORIZED PERSONNEL ONLY</div>

          {error && (
            <div style={{ background: 'rgba(213,0,0,0.10)', border: '1px solid rgba(213,0,0,0.45)', color: '#FF8A8A', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 18, height: 18, background: 'var(--ir-critical)', color: 'white', fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>!</span>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--ir-text-muted)', marginBottom: 6 }}>OPERATOR ID</label>
            <input
              type="text" autoComplete="off" value={user}
              onChange={e => setUser(e.target.value)} placeholder="enter operator id"
              style={{ width: '100%', background: 'var(--ir-navy)', border: '1px solid var(--ir-border)', color: 'var(--ir-text)', padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: 1, outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--ir-text-muted)', marginBottom: 6 }}>ACCESS CODE</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'} value={pw}
                onChange={e => setPw(e.target.value)} placeholder="••••••••"
                style={{ width: '100%', background: 'var(--ir-navy)', border: '1px solid var(--ir-border)', color: 'var(--ir-text)', padding: '12px 60px 12px 14px', fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: 1, outline: 'none' }}
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--ir-text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.5, padding: '4px 8px', cursor: 'pointer' }}
              >{showPw ? 'HIDE' : 'SHOW'}</button>
            </div>
          </div>

          <button type="submit" style={{ width: '100%', background: 'var(--ir-blue)', color: 'white', border: 'none', padding: 14, marginTop: 6, fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 14, letterSpacing: 5, cursor: 'pointer', position: 'relative' }}>
            AUTHENTICATE
            <span style={{ position: 'absolute', right: 14, top: '50%', width: 18, height: 1, background: 'white', transform: 'translateY(-50%)', opacity: 0.7, display: 'block' }} />
          </button>

          <div style={{ marginTop: 22, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 2, color: 'var(--ir-text-dim)' }}>
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
            padding: 28px 20px 24px !important;
            border-right: none !important;
            border-bottom: 1px solid var(--ir-border-soft) !important;
            justify-content: flex-start !important;
            gap: 22px;
          }
          .login-brand-name {
            font-size: 17px !important;
            letter-spacing: 2px !important;
          }
          .login-hero-title {
            font-size: 26px !important;
            line-height: 1.15 !important;
            letter-spacing: 0 !important;
            margin-bottom: 0 !important;
          }
          .login-desc,
          .login-college,
          .login-meta { display: none !important; }
          .login-right {
            padding: 20px 16px 32px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  )
}
