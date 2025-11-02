import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './Chart'

function App() {
  const statistics = useStatistics(10)
  const [activeView, setActiveView] = useState<View>("CPU")

  const cpuUsages = useMemo(
    () => statistics.map(stat => stat.cpuUsage),
    [statistics]
  )
  const ramUsages = useMemo(
    () => statistics.map(stat => stat.ramUsage),
    [statistics]
  )
  const storageUsages = useMemo(
    () => statistics.map(stat => stat.storageUsage),
    [statistics]
  )

  const activeUsages = useMemo(
    () => {
      switch(activeView) {
        case 'CPU':
          return cpuUsages
        case 'RAM':
          return ramUsages
        case 'STORAGE':
          return storageUsages
      }
    }, [activeView, cpuUsages, ramUsages, storageUsages])

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view))
  }, [])

  return (
    <div className="App">
      <div style={{ height: '500px', width: '300px' }}>
        <Chart data={activeUsages} maxDataPoints={10} />
      </div>
    </div>
  )
}

export default App
