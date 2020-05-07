import React, { useEffect } from 'react'
import { NONONO } from '../lib/contants'

export function Nonono() {
  useEffect(() => {
    NONONO.crazy = true
    return () => (NONONO.crazy = false)
  }, [])

  return (
    <div
      className="layer flex justify-center items-center"
      style={{ background: 'rgba(0,0,0,0.75)' }}
    >
      <div className="nonono" />
    </div>
  )
}
