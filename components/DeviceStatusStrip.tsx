'use client'

import type { DeviceStatus } from '@/types'

interface Props { status: DeviceStatus }

function pad(n: number) { return String(n).padStart(2, '0') }
function formatUptime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function ChipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2M9 5h6" />
    </svg>
  )
}
function ServerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" />
      <circle cx="7" cy="17" r="0.8" fill="currentColor" />
      <path d="M11 7h6M11 17h6" />
    </svg>
  )
}

function DeviceCard({ name, icon, metrics }: { name: string; icon: React.ReactNode; metrics: { k: string; v: string }[] }) {
  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: '0 0 30px -10px var(--ir-glow-green)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--ir-surface-2)',
          border: '1px solid var(--ir-border)',
          display: 'grid', placeItems: 'center',
          color: 'var(--ir-blue-light)',
        }}>{icon}</div>
        <div style={{
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 600, fontSize: 13,
          letterSpacing: 1.5, flex: 1,
        }}>{name}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: 2, color: 'var(--ir-safe)',
        }}>
          <span className="status-dot" /> ONLINE
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        paddingTop: 8, borderTop: '1px dashed var(--ir-border-soft)',
      }}>
        {metrics.map(({ k, v }) => (
          <div key={k}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1.5, color: 'var(--ir-text-dim)', marginBottom: 3 }}>{k}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ir-text)' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DeviceStatusStrip({ status }: Props) {
  return (
    <div className="section-in device-strip-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
      {/* Field devices zone */}
      <div className="device-zone-field" style={{ gridColumn: 'span 2', position: 'relative', paddingTop: 22 }}>
        <span className="device-zone-label" style={{
          position: 'absolute', top: 0, left: 0,
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: 2.5, color: 'var(--ir-text-dim)',
        }}>FIELD DEVICES (ON TRAIN)</span>
        <div className="device-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <DeviceCard
            name="RASPBERRY PI ZERO 2W"
            icon={<ChipIcon />}
            metrics={[
              { k: 'SENSORS', v: 'ACTIVE' },
              { k: 'PACKETS SENT', v: status.piPacketCount.toLocaleString() },
              { k: 'UPTIME', v: formatUptime(status.piUptime) },
            ]}
          />
          <DeviceCard
            name="ANDROID BRIDGE · TERMUX"
            icon={<PhoneIcon />}
            metrics={[
              { k: 'MQTT', v: 'CONNECTED' },
              { k: 'BUFFER', v: status.androidBuffer },
              { k: 'LAST PING', v: `${status.androidLastPing}s ago` },
            ]}
          />
        </div>
      </div>

      {/* Central server zone */}
      <div style={{ position: 'relative', paddingTop: 22 }}>
        <span className="device-zone-label" style={{
          position: 'absolute', top: 0, left: 0,
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: 2.5, color: 'var(--ir-text-dim)',
        }}>CENTRAL SERVER</span>
        <DeviceCard
          name="UBUNTU LAPTOP SERVER"
          icon={<ServerIcon />}
          metrics={[
            { k: 'ML MODELS', v: 'RUNNING' },
            { k: 'API', v: 'ACTIVE' },
            { k: 'LAST PUSH', v: `${status.serverLastPush}s ago` },
          ]}
        />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .device-strip-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .device-strip-grid { grid-template-columns: 1fr !important; }
          .device-zone-field { grid-column: span 1 !important; }
          .device-inner-grid { grid-template-columns: 1fr !important; }
          .device-zone-label { display: none !important; }
        }
      `}</style>
    </div>
  )
}
