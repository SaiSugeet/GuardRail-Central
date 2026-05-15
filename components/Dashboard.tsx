'use client'

import { useSimulation } from '@/hooks/useSimulation'
import Navbar from './Navbar'
import DeviceStatusStrip from './DeviceStatusStrip'
import ScenarioControl from './ScenarioControl'
import IRMSGauge from './IRMSGauge'
import RiskBadge from './RiskBadge'
import TrackStateIndicator from './TrackStateIndicator'
import IRMSTrendChart from './IRMSTrendChart'
import FFTSpectrumChart from './FFTSpectrumChart'
import ObstacleLog from './ObstacleLog'
import SystemHealth from './SystemHealth'

interface Props {
  operator: string
  onLogout: () => void
}

export default function Dashboard({ operator, onLogout }: Props) {
  const sim = useSimulation()

  return (
    <div className="dash-fade" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--ir-navy)', overflowX: 'hidden' }}>
      <Navbar operator={operator} onLogout={onLogout} />

      <div className="dash-padding" style={{ padding: '18px 28px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Section A — Devices */}
        <DeviceStatusStrip status={sim.deviceStatus} />

        {/* Section B — Scenario control */}
        <ScenarioControl scenario={sim.currentScenario} setScenario={sim.setScenario} />

        {/* Section C — Metrics row */}
        <div className="section-in metrics-responsive" style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr 1fr',
          gap: 16,
        }}>
          <IRMSGauge value={sim.irmsScore} riskClass={sim.riskClass} />
          <RiskBadge riskClass={sim.riskClass} />
          <TrackStateIndicator scenarioKey={sim.currentScenario} />
        </div>

        {/* Section D — Charts */}
        <div className="section-in charts-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <IRMSTrendChart history={sim.irmsHistory} />
          <FFTSpectrumChart fftData={sim.fftData} />
        </div>

        {/* Section E — Bottom */}
        <div className="section-in bottom-responsive" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
          <ObstacleLog log={sim.obstacleLog} />
          <SystemHealth stats={sim.systemStats} />
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 767px) {
          .dash-padding { padding: 10px 10px 24px !important; gap: 10px !important; }
          .metrics-responsive { grid-template-columns: 1fr !important; }
          .charts-responsive  { grid-template-columns: 1fr !important; }
          .bottom-responsive  { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .metrics-responsive { grid-template-columns: 1fr 1fr !important; }
          .charts-responsive  { grid-template-columns: 1fr !important; }
          .bottom-responsive  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
