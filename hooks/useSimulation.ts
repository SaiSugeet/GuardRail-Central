'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { ScenarioKey, RiskClass, FFTBin, ObstacleEvent, ObstacleClass, SimulationState, DeviceStatus, SystemStats } from '@/types'
import { SCENARIOS, OBSTACLE_WEIGHTS } from '@/lib/constants'

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v))
}

function generateIRMS(scenario: ScenarioKey): number {
  const s = SCENARIOS[scenario]
  const base = rand(s.irmsMin, s.irmsMax)
  const noise = (Math.random() - 0.5) * 4
  return clamp(base + noise, 0, 100)
}

function classifyIRMS(value: number): RiskClass {
  if (value <= 25) return 'SAFE'
  if (value <= 50) return 'MONITOR'
  if (value <= 75) return 'ALERT'
  return 'CRITICAL'
}

function generateFFT(scenario: ScenarioKey): FFTBin[] {
  const bins = 51
  const peakCenter =
    scenario === 'NORMAL'         ? 5  :
    scenario === 'JOINT_FAULT'    ? 18 :
    scenario === 'LOOSE_FASTENER' ? 14 :
    scenario === 'RAIL_CRACK'     ? 26 :
    40

  const peakHeight =
    scenario === 'NORMAL'         ? 35 :
    scenario === 'JOINT_FAULT'    ? 62 :
    scenario === 'LOOSE_FASTENER' ? 55 :
    scenario === 'RAIL_CRACK'     ? 75 :
    95

  const width =
    scenario === 'SEVERE_DAMAGE' ? 18 :
    scenario === 'NORMAL'        ? 6  :
    9

  const out: FFTBin[] = []
  for (let i = 0; i < bins; i++) {
    const d = (i - peakCenter) / width
    const base = peakHeight * Math.exp(-d * d) * (0.85 + Math.random() * 0.3)
    const floor = 4 + Math.random() * 6
    let secondary = 0
    if (scenario === 'SEVERE_DAMAGE') {
      const d2 = (i - 46) / 5
      secondary = 55 * Math.exp(-d2 * d2) * (0.8 + Math.random() * 0.4)
    }
    out.push({ frequency: i, power: clamp(base + floor + secondary, 0, 100) })
  }
  return out
}

let _evId = 0

function generateObstacleEvent(scenario: ScenarioKey): ObstacleEvent {
  const weights = OBSTACLE_WEIGHTS[scenario]
  const r = Math.random()
  let cumulative = 0
  let cls: ObstacleClass = 'CLEAR'

  cumulative += weights.CLEAR
  if (r < cumulative) { cls = 'CLEAR' }
  else {
    cumulative += weights.CATTLE
    if (r < cumulative) { cls = 'CATTLE' }
    else {
      cumulative += weights.PERSON
      if (r < cumulative) { cls = 'PERSON' }
      else { cls = 'DEBRIS' }
    }
  }

  const confidence = cls === 'CLEAR' ? rand(0.90, 0.99) : rand(0.65, 0.95)
  return { id: `ev-${++_evId}`, timestamp: new Date(), obstacleClass: cls, confidence }
}

function formatUptime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(h)}:${p(m)}:${p(s)}`
}

export function useSimulation(): SimulationState {
  const [currentScenario, setCurrentScenario] = useState<ScenarioKey>('NORMAL')

  const [irmsScore, setIrmsScore] = useState<number>(12)
  const [irmsHistory, setIrmsHistory] = useState<number[]>(() => {
    const arr: number[] = []
    for (let i = 0; i < 60; i++) arr.push(generateIRMS('NORMAL'))
    return arr
  })
  const [riskClass, setRiskClass] = useState<RiskClass>('SAFE')
  const [fftData, setFftData] = useState<FFTBin[]>(() => generateFFT('NORMAL'))
  const [obstacleLog, setObstacleLog] = useState<ObstacleEvent[]>(() => {
    const seed: ObstacleEvent[] = []
    for (let i = 0; i < 8; i++) {
      const ev = generateObstacleEvent('NORMAL')
      ev.timestamp = new Date(Date.now() - (8 - i) * 4000)
      ev.id = `seed-${i}`
      seed.push(ev)
    }
    return seed.reverse()
  })

  const initPackets = useRef(Math.floor(rand(150000, 200000)))
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    piPacketCount: initPackets.current,
    piUptime: Math.floor(rand(0, 3600 * 8)),
    androidMqttConnected: true,
    androidBuffer: 'HEALTHY',
    androidLastPing: 2,
    serverMlRunning: true,
    serverApiActive: true,
    serverLastPush: 1,
  })

  const scnStartRef = useRef(Date.now())
  const [systemStats, setSystemStats] = useState<SystemStats>({
    packetsProcessed: initPackets.current,
    scenarioUptime: 0,
    apiResponse: 96,
    modelConfidence: 94.2,
    vibrationComponent: 6,
    obstacleComponent: 2,
    communicationComponent: 4,
  })

  const setScenario = useCallback((scenario: ScenarioKey) => {
    setCurrentScenario(scenario)
    scnStartRef.current = Date.now()
    setFftData(generateFFT(scenario))
  }, [])

  // 1 Hz tick — IRMS + device counters
  useEffect(() => {
    const timer = setInterval(() => {
      const newV = generateIRMS(currentScenario)
      setIrmsScore(newV)
      setRiskClass(classifyIRMS(newV))
      setIrmsHistory(h => [...h.slice(-59), newV])

      setDeviceStatus(d => ({
        ...d,
        piPacketCount: d.piPacketCount + 1 + Math.floor(Math.random() * 3),
        piUptime: d.piUptime + 1,
        androidLastPing: Math.floor(rand(1, 5)),
        serverLastPush: Math.floor(rand(1, 4)),
      }))

      setSystemStats(s => {
        const vib  = newV * clamp(0.55 + (Math.random() - 0.5) * 0.04, 0.5, 0.6)
        const obst = newV * clamp(0.20 + (Math.random() - 0.5) * 0.04, 0.16, 0.24)
        const comm = Math.max(0, newV - vib - obst)
        return {
          packetsProcessed: s.packetsProcessed + 1 + Math.floor(Math.random() * 3),
          scenarioUptime: Math.floor((Date.now() - scnStartRef.current) / 1000),
          apiResponse: Math.floor(82 + Math.random() * 38),
          modelConfidence: 90 + Math.random() * 8,
          vibrationComponent: vib,
          obstacleComponent: obst,
          communicationComponent: comm,
        }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentScenario])

  // 5 s FFT refresh
  useEffect(() => {
    const timer = setInterval(() => setFftData(generateFFT(currentScenario)), 5000)
    return () => clearInterval(timer)
  }, [currentScenario])

  // Obstacle events every 3-5 s
  useEffect(() => {
    let alive = true
    const schedule = () => {
      const delay = 3000 + Math.random() * 2000
      setTimeout(() => {
        if (!alive) return
        setObstacleLog(l => [generateObstacleEvent(currentScenario), ...l].slice(0, 20))
        schedule()
      }, delay)
    }
    schedule()
    return () => { alive = false }
  }, [currentScenario])

  return {
    currentScenario, irmsScore, irmsHistory, riskClass,
    fftData, obstacleLog, deviceStatus, systemStats, setScenario,
  }
}

export { formatUptime, generateFFT }
