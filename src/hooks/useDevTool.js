import { useState, useCallback, useEffect } from 'react'

export function useDevTool() {
  const [open, set] = useState(false)

  const onChange = useCallback((e) => set(e.detail.isOpen), [set])

  useEffect(() => {
    window.addEventListener('devtoolschange', onChange)
    return () => window.removeEventListener('devtoolschange', onChange)
  })

  return open
}
