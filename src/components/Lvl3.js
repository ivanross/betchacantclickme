import React, { useRef, useEffect, useState, useCallback } from 'react'
import { setBgColor, set, setText, fadeOutAndHide, filterBlur } from '../lib/transition'
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

const PHYSICS = {
  friction: 0.1,
  maxSpeed: 100,
  initialSpeed: 100,
  repulsiveForce: 0.2,
  repulsiveRange: 500,
  bounceForce: 3,
}

function animateCouter(step, onGo) {
  const node = document.querySelector('.counter')
  setText(node, step || 'Go!')
  set(node, 'opacity', 1, 0)
  requestAnimationFrame(() =>
    requestAnimationFrame(() => set(document.querySelector('.counter'), 'opacity', 0, 1000))
  )

  if (step > 0) setTimeout(() => animateCouter(step - 1, onGo), 1000)
  else {
    setBgColor(document.body, '#4D21FC')
    onGo()
  }
}

export function Lvl3({ chronometer, mousePosRef, onLevelCompleted, wrapperRef }) {
  const left = useRef(null)
  const right = useRef(null)
  const [isCountdown, setIsCountdown] = useState(false)
  const [hasStarted, setStarted] = useState(false)
  const [leftClicked, setLeftClicked] = useState(false)
  const [rightClicked, setRightClicked] = useState(false)

  const startCountdown = useCallback(() => {
    const l = left.current
    const r = right.current

    if (!l || !r) return
    l.start()
    r.start()

    document.querySelectorAll('.fade-out, #footer').forEach(fadeOutAndHide)

    animateCouter(3, () => {
      setStarted(true)
      chronometer.start()
    })
    setIsCountdown(true)
  }, [setIsCountdown, setStarted, chronometer])

  const stopButton = useCallback(
    (isLeft) => {
      if (isLeft && leftClicked) return
      if (!isLeft && rightClicked) return

      const setter = isLeft ? setLeftClicked : setRightClicked
      const betcha = (isLeft ? left : right).current

      if (!betcha) return
      betcha.stop()
      filterBlur(betcha.node())
      setter(true)

      if ((isLeft && rightClicked) || leftClicked) {
        chronometer.stop()
        onLevelCompleted()
      }
    },
    [leftClicked, rightClicked, setLeftClicked, setRightClicked, chronometer, onLevelCompleted]
  )

  const handleClick = useCallback(
    (isLeft) => () => {
      if (!isCountdown) return startCountdown()
      if (!hasStarted) return
      stopButton(isLeft)
    },
    [isCountdown, hasStarted, startCountdown, stopButton]
  )

  useEffect(() => setBgColor(document.body, '#fff111'), [])

  return (
    <div className="fg layer">
      <div className="layer flex justify-center items-center pointer-events-none">
        <div className="counter black o-0" style={{ fontSize: '4rem' }}>
          3
        </div>
      </div>
      <div className="w-100 h-100 flex flex-column justify-center items-center black pa3">
        <div className="f1 ma2">
          <BetchaCantClickMe
            ref={left}
            className="black bg-transparent user-select-none f1"
            onClick={handleClick(true)}
            mousePosRef={mousePosRef}
            physics={hasStarted ? PHYSICS : INITIAL_PHYSICS}
            wrapperRef={wrapperRef}
          >
            🤯
          </BetchaCantClickMe>
          <span className="fade-out mh2">AMAZING</span>
          <BetchaCantClickMe
            ref={right}
            className="black bg-transparent user-select-none f1"
            onClick={handleClick(false)}
            mousePosRef={mousePosRef}
            physics={hasStarted ? PHYSICS : INITIAL_PHYSICS}
            wrapperRef={wrapperRef}
          >
            🤯
          </BetchaCantClickMe>
        </div>
        <div className="fade-out f2">You made it in AGAIN</div>
        <div className="fade-out f3">It took only {chronometer.time / 1000} seconds</div>
      </div>
      <Footer dark />
    </div>
  )
}
