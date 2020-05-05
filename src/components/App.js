import React, { useRef, useEffect, useState } from 'react'
import { Summary } from './Summary'
import { useMousePositionRef } from '../hooks/useMousePositionRef'
import { setBgColor } from '../lib/setBgColor'
import { fadeIn } from '../lib/fadeIn'

const WIDTH = 140
const HEIGHT = 100

const MAX_INITIAL_SPEED = 80

const FRICTION = 0.1
const REPULSION = 0.4
const REPULSION_RANGE = 500
const BOUNCE_FORCE = 2
const raf = requestAnimationFrame

function firstClick() {
  setBgColor(document.body, 'red')
}

function secondClick() {
  const btn = document.querySelector('.click-me')
  if (btn) btn.style.filter = 'blur(5px)'
  setBgColor(document.body, '#263238')
}

export function App() {
  const [mouseListenerRef, mousePosRef] = useMousePositionRef()

  const playAnimation = useRef(false)
  const clicked = useRef(false)
  const startTime = useRef(null)
  const [elapsedTime, setElapsedTime] = useState(null)

  const btnRef = useRef(null)
  const btnPos = useRef({ x: 0, y: 0 }).current
  const btnSpeed = useRef({ x: 0, y: 0 }).current
  const btnAngle = useRef({ a: 0 }).current

  // INIT
  useEffect(() => {
    btnPos.x = window.innerWidth / 2
    btnPos.y = window.innerHeight / 2
    btnRef.current.style.transform = `translate(
      ${btnPos.x - WIDTH / 2}px,
      ${btnPos.y - HEIGHT / 2}px
    )`

    fadeIn(btnRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // LOOP
  function animate() {
    const mousePos = mousePosRef.current
    const distVec = { x: mousePos.x - btnPos.x, y: mousePos.y - btnPos.y }
    const dist = Math.hypot(distVec.x, distVec.y)

    if (dist < REPULSION_RANGE) {
      const repulsionMagn = REPULSION * (1 - REPULSION_RANGE / dist)

      const repulsionVec = {
        x: (distVec.x / dist) * repulsionMagn,
        y: (distVec.y / dist) * repulsionMagn,
      }
      btnSpeed.x += repulsionVec.x
      btnSpeed.y += repulsionVec.y
    }

    if (btnSpeed.x !== 0 && btnSpeed.y !== 0) {
      const newAngle = Math.atan2(btnSpeed.x, -btnSpeed.y)
      btnAngle.a += (newAngle - btnAngle.a) * 0.05
    }

    btnSpeed.x /= FRICTION + 1
    btnSpeed.y /= FRICTION + 1

    if (Math.abs(btnSpeed.x) < 0.01) btnSpeed.x = 0
    if (Math.abs(btnSpeed.y) < 0.01) btnSpeed.y = 0

    if (btnPos.x <= WIDTH / 2) btnSpeed.x *= -BOUNCE_FORCE
    if (btnPos.x >= window.innerWidth - WIDTH / 2 - 1) btnSpeed.x *= -BOUNCE_FORCE
    if (btnPos.y <= HEIGHT / 2) btnSpeed.y *= -BOUNCE_FORCE
    if (btnPos.y >= window.innerHeight - HEIGHT / 2 - 1) btnSpeed.y *= -BOUNCE_FORCE

    btnSpeed.x = Math.min(MAX_INITIAL_SPEED, btnSpeed.x)
    btnSpeed.y = Math.min(MAX_INITIAL_SPEED, btnSpeed.y)

    btnPos.x += btnSpeed.x
    btnPos.y += btnSpeed.y

    if (btnRef.current) {
      btnRef.current.style.transform = `translate3d(
      ${btnPos.x - WIDTH / 2}px, 
      ${btnPos.y - HEIGHT / 2}px,
      0px
    ) rotate(${btnAngle.a - Math.PI / 2}rad)`
    }
    if (playAnimation.current) raf(animate)
  }

  return (
    <div ref={mouseListenerRef} className="wrapper">
      <button
        ref={btnRef}
        className="click-me"
        style={{
          width: WIDTH,
          height: HEIGHT,
        }}
        onClick={() => {
          if (clicked.current) return
          if (!playAnimation.current) {
            playAnimation.current = true
            btnSpeed.x = (Math.random() * 2 - 1) * MAX_INITIAL_SPEED
            btnSpeed.y = (Math.random() * 2 - 1) * MAX_INITIAL_SPEED
            raf(animate)
            firstClick()
            startTime.current = Date.now()
          } else {
            playAnimation.current = false
            clicked.current = true
            secondClick()
            setElapsedTime(Date.now() - startTime.current)
          }
        }}
      >
        Click Me!
      </button>
      {elapsedTime && <Summary time={elapsedTime} />}
    </div>
  )
}
