'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import type { FFTBin } from '@/types'

interface Props { fftData: FFTBin[] }

function barColor(power: number): string {
  if (power <= 55) return '#2E75C3'
  if (power <= 75) return '#C05A00'
  return '#A51C1C'
}

export default function FFTSpectrumChart({ fftData }: Props) {
  const domIdx = fftData.reduce((best, b, i) => b.power > fftData[best].power ? i : best, 0)
  const domBin = fftData[domIdx]

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
          FFT VIBRATION SPECTRUM
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: 1.5, color: 'var(--ir-text-dim)',
          padding: '3px 7px',
          background: 'var(--ir-surface-2)',
          border: '1px solid var(--ir-border)',
        }}>
          0.2 HZ · UPDATE
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 220 }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={fftData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }} barCategoryGap="10%">
            <XAxis
              dataKey="frequency"
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#8A96A8' }}
              tickLine={false}
              axisLine={{ stroke: '#D1D9E6' }}
              tickFormatter={(v) => [0, 10, 20, 30, 40, 50].includes(v) ? `${v} Hz` : ''}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#8A96A8' }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--ir-surface)',
                border: '1px solid var(--ir-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--ir-text)',
                boxShadow: 'var(--ir-shadow-sm)',
              }}
              formatter={(v: number) => [v.toFixed(1), 'Power']}
              labelFormatter={(l: number) => `${l} Hz`}
            />
            <Bar dataKey="power" isAnimationActive={false}>
              {fftData.map((entry, index) => (
                <Cell key={index} fill={barColor(entry.power)} opacity={index === domIdx ? 1 : 0.82} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: 1.5, color: 'var(--ir-text-muted)',
        marginTop: 6,
      }}>
        DOMINANT FREQUENCY:{' '}
        <strong style={{ color: 'var(--ir-blue-mid)', fontWeight: 500 }}>{domBin?.frequency ?? 0} Hz</strong>
        {' '}· POWER: {domBin?.power.toFixed(1) ?? '0.0'} · BINS: {fftData.length}
      </div>
    </div>
  )
}
