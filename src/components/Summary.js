import React, { useRef, useEffect } from 'react'
import { setBgColor } from '../lib/transition'
import { BetchaCantClickMe } from './BetchaCantClickMe'
import { Footer } from './Footer'

const INITIAL_PHYSICS = {
  friction: 0,
  maxSpeed: 100,
  initialSpeed: 1000,
  repulsiveForce: 0,
  repulsiveRange: 0,
  bounceForce: 1,
}

export function Summary({ chronometer, mousePosRef }) {
  const left = useRef(null)
  const right = useRef(null)

  const infiniteRun = () => {
    const l = left.current
    const r = right.current

    if (!l || !r) return
    l.start()
    r.start()
  }

  useEffect(() => setBgColor(document.body, '#fff111'), [])

  return (
    <div className="fg layer">
      <div className="w-100 h-100 flex flex-column justify-center items-center black pa3">
        <div className="f1 ma2">
          <BetchaCantClickMe
            ref={left}
            className="black bg-transparent"
            onClick={infiniteRun}
            mousePosRef={mousePosRef}
            physics={INITIAL_PHYSICS}
          >
            🤯
          </BetchaCantClickMe>{' '}
          AMAZING{' '}
          <BetchaCantClickMe
            ref={right}
            className="black bg-transparent"
            onClick={infiniteRun}
            mousePosRef={mousePosRef}
            physics={INITIAL_PHYSICS}
          >
            🤯
          </BetchaCantClickMe>
        </div>
        <div className="f2">You made it in AGAIN</div>
        <div className="f3">It took only {chronometer.time / 1000} seconds</div>
      </div>
      <Footer dark />
    </div>
  )
}
