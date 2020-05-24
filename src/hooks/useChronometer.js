import { useRef, useState } from 'react'
import { sum } from 'lodash-es'

export function useChronometer() {
  const startTime = useRef(null)
  const [time, setTime] = useState(null)
  const [history, setHistory] = useState([])

  const start = () => (startTime.current = Date.now())
  const stop = () => {
    const t = Date.now() - startTime.current
    setTime(t)
    setHistory((prev) => [...prev, t])
  }

  return {
    time,
    start,
    stop,
    history,
    total: () => sum(history),
  }
}
