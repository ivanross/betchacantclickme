import { useRef, useState } from 'react'

export function useChronometer() {
  const startTime = useRef(null)
  const [time, setTime] = useState(null)

  const start = () => (startTime.current = Date.now())
  const stop = () => setTime(Date.now() - startTime.current)

  return {
    time,
    start,
    stop,
  }
}
