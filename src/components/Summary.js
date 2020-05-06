import React, { useRef, useEffect } from 'react'
import { setBgColor } from '../lib/transition'
import { BetchaCantClickMe } from './BetchaCantClickMe'
import { Footer } from './Footer'
export function Summary({ chronometer, mousePosRef }) {
  const betchaLRef = useRef(null)
  const betchaRRef = useRef(null)

  const infiniteRun = () => {
    const l = betchaLRef.current
    const r = betchaRRef.current

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
            ref={betchaLRef}
            className="black bg-transparent"
            onClick={infiniteRun}
            mousePosRef={mousePosRef}
            physics={{
              friction: 0,
              maxSpeed: 70,
              initialSpeed: 1000,
              repulsiveForce: 0,
              repulsiveRange: 0,
              bounceForce: 10,
            }}
          >
            🤯
          </BetchaCantClickMe>{' '}
          AMAZING{' '}
          <BetchaCantClickMe
            ref={betchaRRef}
            className="black bg-transparent"
            onClick={infiniteRun}
            mousePosRef={mousePosRef}
            physics={{
              friction: 0,
              maxSpeed: 70,
              initialSpeed: 1000,
              repulsiveForce: 0,
              repulsiveRange: 0,
              bounceForce: 10,
            }}
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
