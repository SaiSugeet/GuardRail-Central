'use client'

import { LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts'

interface Props { history: number[] }

function colorFor(v: number) {
  if (v <= 25) return '#1B7A3E'
  if (v <= 50) return '#B8860B'
  if (v <= 75) return '#C05A00'
  return '#A51C1C'
}

export default function IRMSTrendChart({ history }: Props) {
  const maxN = 60
  const data = history.slice(-maxN).map((v, i) => ({ i, v }))
  const latest = data[data.length - 1]?.v ?? 0
  const mean = data.length ? data.reduce((a, b) => a + b.v, 0) / data.length : 0
  const lineColor = colorFor(latest)

  return (
    <div style={{
      background: 'var(--ir-surface)',
      border: '1px solid var(--ir-border)',
      boxShadow: 'var(--ir-shadow-sm)',
      padding: 18, minHeight: 280,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, letterSpacing: 3, color: 'var(--ir-text-muted)' }}>
          IRMS TREND — LAST 60 READINGS
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: 1.5, color: 'var(--ir-text-dim)',
          padding: '3px 7px',
          background: 'var(--ir-surface-2)',
          border: '1px solid var(--ir-border)',
        }}>
          1 HZ · LIVE
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 220 }}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <XAxis
              dataKey="i"
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#8A96A8' }}
              tickLine={false}
              axisLine={{ stroke: '#D1D9E6' }}
              tickFormatter={(v) => {
                const offset = v - (maxN - 1)
                if (offset === -(maxN - 1)) return '-60s'
                if (offset === -Math.floor((maxN - 1) / 2)) return '-30s'
                if (offset === 0) return 'NOW'
                return ''
              }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#8A96A8' }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <ReferenceLine y={25} stroke="#D1D9E6" strokeDasharray="3 4" strokeOpacity={0.8} />
            <ReferenceLine y={50} stroke="#D1D9E6" strokeDasharray="3 4" strokeOpacity={0.8} />
            <ReferenceLine y={75} stroke="#D1D9E6" strokeDasharray="3 4" strokeOpacity={0.8} />
            <Tooltip
              contentStyle={{
                background: 'var(--ir-surface)',
                border: '1px solid var(--ir-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--ir-text)',
                boxShadow: 'var(--ir-shadow-sm)',
              }}
              formatter={(v: number) => [v.toFixed(1), 'IRMS']}
              labelFormatter={() => ''}
            />
            <Line
              type="monotone" dataKey="v"
              stroke={lineColor} strokeWidth={1.8}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: 1.5, color: 'var(--ir-text-muted)',
        marginTop: 6,
      }}>
        CURRENT:{' '}
        <strong style={{ color: 'var(--ir-blue-mid)', fontWeight: 500 }}>{latest.toFixed(1)}</strong>
        {' '}· WINDOW MEAN: {mean.toFixed(1)}
      </div>
    </div>
  )
}
