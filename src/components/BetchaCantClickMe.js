import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import { NONONO } from '../lib/contants'
import { useConst } from '../hooks/useConst'

const PI = Math.PI
const TAU = Math.PI * 2

const normalizeDeltaAngle = (delta) => {
  return delta >= 0 ? ((delta + PI) % TAU) - PI : ((delta - PI) % -TAU) + PI
}

const rotate = (x, y, theta) => [
  x * Math.cos(theta) + y * Math.sin(theta),
  y * Math.cos(theta) - x * Math.sin(theta),
]
const getRotatedBoundingRect = (width, height, theta) => {
  const corners = [
    [-width / 2, -height / 2],
    [width / 2, -height / 2],
    [width / 2, height / 2],
    [-width / 2, height / 2],
  ]

  const rotatedCorners = corners.map(([x, y]) => rotate(x, y, theta))

  return {
    width: Math.abs(2 * Math.max(...rotatedCorners.map((pos) => pos[0]))),
    height: Math.abs(2 * Math.max(...rotatedCorners.map((pos) => pos[1]))),
  }
}

const DEFAULT_PHYSICS = {
  friction: 0.1,
  maxSpeed: 100,
  initialSpeed: 80,
  repulsiveForce: 0.4,
  repulsiveRange: 500,
  bounceForce: 2,
}

const raf = requestAnimationFrame

export const BetchaCantClickMe = forwardRef(
  (
    {
      id,
      children,
      style,
      className,
      mousePosRef,
      onClick,
      onMouseDown,
      wrapperRef,
      physics: _physics = {},
    },
    forwardedRef
  ) => {
    const ref = useRef(null)
    const size = useConst({ width: 0, height: 0 })
    const pos = useConst({ x: 0, y: 0 })
    const speed = useConst({ x: 0, y: 0 })
    const angle = useConst({ a: 0 })
    const physicsRef = useRef({ ...DEFAULT_PHYSICS, ..._physics })

    useEffect(() => {
      physicsRef.current = { ...DEFAULT_PHYSICS, ..._physics }
    }, [_physics])

    const playAnimation = useRef(false)

    function setup() {
      const btn = ref.current
      if (!btn) return

      // Duplicate node and insert after target element
      // to keep the layout unchanged
      const btnCopy = btn.cloneNode(true)
      btnCopy.style.opacity = 0
      btnCopy.style.pointerEvents = 'none'

      if (btn.nextSibling) {
        btn.parentNode.insertBefore(btnCopy, btn.nextSibling)
      } else {
        btn.parentNode.appendChild(btnCopy)
      }

      // Set Initial values
      const bbox = btn.getBoundingClientRect()
      size.width = bbox.width
      size.height = bbox.height

      pos.x = bbox.left + bbox.width / 2
      pos.y = bbox.top + bbox.height / 2

      const randomAngle = Math.random() * TAU
      speed.x = Math.cos(randomAngle) * physicsRef.current.initialSpeed
      speed.y = Math.sin(randomAngle) * physicsRef.current.initialSpeed

      // Change postion to fixed
      if (wrapperRef?.current) wrapperRef.current.appendChild(btn)

      btn.style.position = 'fixed'
      btn.style.top = 0
      btn.style.left = 0

      btn.style.transform = `translate3d(
        ${pos.x - size.width / 2}px,
        ${pos.y - size.height / 2}px,
        0
      )`
    }

    function animate() {
      const mousePos = mousePosRef.current
      const physics = physicsRef.current

      if (NONONO.crazy) {
        if (ref.current) {
          ref.current.style.transform = `translate3d(
          ${Math.random() * window.innerWidth}px, 
          ${Math.random() * window.innerHeight}px,
          0px
        ) rotate(${Math.random() * TAU}rad)`
        }
        raf(animate)
        return
      }

      const distVec = { x: mousePos.x - pos.x, y: mousePos.y - pos.y }
      const dist = Math.hypot(distVec.x, distVec.y)

      // REPULSIVE FORCE
      if (dist < physics.repulsiveRange) {
        const repulsionMagn = physics.repulsiveForce * (1 - physics.repulsiveRange / dist)

        const repulsionVec = {
          x: (distVec.x / dist) * repulsionMagn,
          y: (distVec.y / dist) * repulsionMagn,
        }
        speed.x += repulsionVec.x
        speed.y += repulsionVec.y

        // ROTATE
        if (repulsionVec.x !== 0 && repulsionVec.y !== 0) {
          const newAngle = Math.atan2(repulsionVec.x, -repulsionVec.y)
          angle.a += normalizeDeltaAngle(newAngle - angle.a) * 0.075
        }
      }

      // FRICITON
      speed.x /= physics.friction + 1
      speed.y /= physics.friction + 1

      // stop target if too slow
      if (Math.abs(speed.x) < 0.01) speed.x = 0
      if (Math.abs(speed.y) < 0.01) speed.y = 0

      // BOUNCE
      const rotatedBox = getRotatedBoundingRect(size.width, size.height, angle.a)
      // check LEFT border
      if (pos.x <= 1 + rotatedBox.width / 2) {
        pos.x = 1 + rotatedBox.width / 2
        if (speed.x < 0) speed.x *= -physics.bounceForce
      }
      // check RIGHT border
      if (pos.x >= window.innerWidth - 1 - rotatedBox.width / 2) {
        pos.x = window.innerWidth - 1 - rotatedBox.width / 2
        if (speed.x > 0) speed.x *= -physics.bounceForce
      }
      // check TOP border
      if (pos.y <= 1 + rotatedBox.height / 2) {
        pos.y = 1 + rotatedBox.height / 2
        if (speed.y < 0) speed.y *= -physics.bounceForce
      }
      // check BOTTOM border
      if (pos.y >= window.innerHeight - 1 - rotatedBox.height / 2) {
        pos.y = window.innerHeight - 1 - rotatedBox.height / 2
        if (speed.y > 0) speed.y *= -physics.bounceForce
      }

      // clamp speed if too fast
      const speedMagnitude = Math.hypot(speed.x, speed.y)
      const speedAngle = Math.atan2(speed.y, speed.x)
      if (speedMagnitude > physics.maxSpeed) {
        speed.x = Math.cos(speedAngle) * physics.maxSpeed
        speed.y = Math.sin(speedAngle) * physics.maxSpeed
      }

      // SPEED
      pos.x += speed.x
      pos.y += speed.y

      if (ref.current) {
        ref.current.style.transform = `translate3d(
          ${pos.x - size.width / 2}px, 
          ${pos.y - size.height / 2}px,
          0px
        ) rotate(${angle.a}rad)`
      }
      if (playAnimation.current) raf(animate)
    }

    useImperativeHandle(forwardedRef, () => ({
      start: () => {
        setup()
        playAnimation.current = true
        raf(animate)
      },
      stop: () => {
        playAnimation.current = false
      },
      resume: () => {
        playAnimation.current = true
        raf(animate)
      },
      node: () => ref.current,
    }))

    return (
      <button
        id={id}
        className={className}
        style={style}
        ref={ref}
        onClick={onClick}
        onMouseDown={() => {
          NONONO.crazy
            ? console.log("%cC'MON YOU CAN DO BETTER 😏", 'color:red;font-size:30px')
            : onMouseDown && onMouseDown()
        }}
      >
        {children}
      </button>
    )
  }
)
