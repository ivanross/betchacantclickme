import { useRef, useCallback, useEffect } from 'react'

export function useMousePositionRef(givenRef = null) {
  const ref = givenRef ?? useRef(null) // eslint-disable-line react-hooks/rules-of-hooks
  const mouse = useRef({ x: null, y: null })

  const handleMouseLeave = () => {
    mouse.current = { x: null, y: null }
  }

  const handleMouseMove = useCallback(
    (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      const refBB = ref.current.getBoundingClientRect()
      mouse.current = { x: mouseX - refBB.left, y: mouseY - refBB.top }
    },
    [ref]
  )

  useEffect(() => {
    const refCurrent = ref.current
    if (refCurrent) {
      refCurrent.addEventListener('mousemove', handleMouseMove)
      refCurrent.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('mousemove', handleMouseMove)
        refCurrent.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [ref, ref.current, handleMouseMove]) // eslint-disable-line react-hooks/exhaustive-deps

  return givenRef ? [mouse] : [ref, mouse]
}
