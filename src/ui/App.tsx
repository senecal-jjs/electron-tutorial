import { useEffect, useMemo } from 'react'
import './App.css'
import { BaseChart } from './BaseChart'
import { useStatistics } from './useStatistics'
import { Chart } from './Chart'

function App() {
  const statistics = useStatistics(10)
  const cpuUsages = useMemo(
    () => statistics.map(stat => stat.cpuUsage),
    [statistics]
  )

  return (
    <>
      <div className="App" style={{ height: '500px', width: '100%' }}>
        <div style={{ height: '100%', width: '300px' }}>
          <Chart data={cpuUsages} />
        </div>
      </div>
    </>
  )
}

export default App
