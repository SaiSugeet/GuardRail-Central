export type ScenarioKey = 'NORMAL' | 'JOINT_FAULT' | 'LOOSE_FASTENER' | 'RAIL_CRACK' | 'SEVERE_DAMAGE'
export type RiskClass = 'SAFE' | 'MONITOR' | 'ALERT' | 'CRITICAL'
export type ObstacleClass = 'CLEAR' | 'CATTLE' | 'PERSON' | 'DEBRIS'

export interface Scenario {
  label: string
  irmsMin: number
  irmsMax: number
  color: 'blue' | 'yellow' | 'orange' | 'red'
  desc: string
  expectedRange: string
}

export interface FFTBin {
  frequency: number
  power: number
}

export interface ObstacleEvent {
  id: string
  timestamp: Date
  obstacleClass: ObstacleClass
  confidence: number
}

export interface DeviceStatus {
  piPacketCount: number
  piUptime: number
  androidMqttConnected: boolean
  androidBuffer: string
  androidLastPing: number
  serverMlRunning: boolean
  serverApiActive: boolean
  serverLastPush: number
}

export interface SystemStats {
  packetsProcessed: number
  scenarioUptime: number
  apiResponse: number
  modelConfidence: number
  vibrationComponent: number
  obstacleComponent: number
  communicationComponent: number
}

export interface SimulationState {
  currentScenario: ScenarioKey
  irmsScore: number
  irmsHistory: number[]
  riskClass: RiskClass
  fftData: FFTBin[]
  obstacleLog: ObstacleEvent[]
  deviceStatus: DeviceStatus
  systemStats: SystemStats
  setScenario: (scenario: ScenarioKey) => void
}
