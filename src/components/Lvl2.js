import React, { useRef, useEffect } from 'react'
import { BetchaCantClickMe } from './BetchaCantClickMe'
import { Footer } from './Footer'
import { setBgColor, setText, fadeOut, filterBlur, fadeIn } from '../lib/transition'
import { useIncrement } from '../hooks/useIncrement'

export function Lvl2({
  chronometer,
  nickname,
  onNicknameChange,
  mousePosRef,
  onLevelCompleted,
  wrapperRef,
}) {
  const betchaRef = useRef(null)
  const [clickCount, incrementClickCount] = useIncrement(0)

  useEffect(() => setBgColor(document.body, '#263238'), [])

  function handleBtnClick() {
    const betcha = betchaRef.current

    if (!betcha) return
    if (clickCount === 0) {
      betcha.start()
      chronometer.start()

      // Style update
      setBgColor(document.body, '#ee5396')
      document.querySelectorAll('.fade-out, #footer').forEach(fadeOut)
      fadeIn(document.querySelector('.message'))

      setText(betcha.node(), '😈')

      // Dismiss message
      setTimeout(() => fadeOut(document.querySelector('.message')), 5000)
    } else if (clickCount === 1) {
      betcha.stop()
      chronometer.stop()

      // Style update
      filterBlur(betcha.node())
      onLevelCompleted()
    }

    incrementClickCount()
  }

  return (
    <div className="fg layer">
      <Message />
      <div className="w-100 h-100 flex flex-column justify-center items-center pa3">
        <div className="f1 ma2 fade-out">🎉 WOW 🎉</div>

        <div className="f3 fade-out">You made it in {chronometer.time / 1000} seconds</div>
        <div className="f5 mt4 fade-out">Add your nickname, save your time, share with others</div>

        <div className="mv2">
          <input
            className="pa2 br2 mr3 mb3 f5 shadow-6 fade-out"
            type="text"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
          />
          <BetchaCantClickMe
            ref={betchaRef}
            className="pa2 br2  f5 shadow-6 user-select-none bg-white"
            onClick={handleBtnClick}
            mousePosRef={mousePosRef}
            wrapperRef={wrapperRef}
            physics={{
              friction: 0.1,
              maxSpeed: 100,
              initialSpeed: 100,
              repulsiveForce: 0.2,
              repulsiveRange: 500,
              bounceForce: 3,
            }}
          >
            Ok
          </BetchaCantClickMe>
        </div>
      </div>
      {clickCount === 0 && <Footer />}
    </div>
  )
}

const Message = () => (
  <div className="message layer o-0 pointer-events-none flex flex-column justify-center items-center black pa3 new-font">
    <div className="f3 text-center">Did you really think it was that easy?</div>
    <div className="f1 text-center">Betcha can&apos;t click me NOW!</div>
  </div>
)
