import { useState, useCallback } from 'react'

export function useIncrement(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = useCallback(() => setCount((n) => n + 1), [])
  return [count, increment]
}
