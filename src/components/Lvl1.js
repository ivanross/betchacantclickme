import React, { useRef } from 'react'
import { BetchaCantClickMe } from './BetchaCantClickMe'
import { useIncrement } from '../hooks/useIncrement'
import { setBgColor, setText, fadeOut, filterBlur } from '../lib/transition'

export function Lvl1({
  chronometer,
  nickname,
  onNicknameChange,
  mousePosRef,
  onLevelCompleted,
  wrapperRef,
}) {
  const betchaRef = useRef(null)
  const [clickCount, incrementClickCount] = useIncrement(0)

  function handleBtnClick() {
    const betcha = betchaRef.current
    if (!betcha) return
    if (clickCount === 0) {
      betcha.start()
      chronometer.start()

      // Style update
      setBgColor(document.body, 'red')
      setText(betcha.node(), 'Catch me!')
      fadeOut(document.querySelector('#title'))
      fadeOut(document.querySelector('#nickname'))
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
    <div className="layer flex flex-column justify-center items-center pa3">
      <div id="title" className="f1 kalam white">
        Betcha can&apos;t click me!
      </div>
      <div>
        <input
          id="nickname"
          className="pa3 br2 mr3 mv2 f3 shadow-6 kalam"
          type="text"
          placeholder="nickname"
          value={nickname}
          onChange={(e) => onNicknameChange(e.target.value)}
        />
        <BetchaCantClickMe
          ref={betchaRef}
          className="click-me bg-white shadow-6 kalam f3 br2 pv3 user-select-none"
          style={{ width: 140 }}
          physics={{
            friction: 0.1,
            maxSpeed: 100,
            initialSpeed: 30,
            repulsiveForce: 0.2,
            repulsiveRange: 500,
            bounceForce: 3,
          }}
          onMouseDown={handleBtnClick}
          mousePosRef={mousePosRef}
          wrapperRef={wrapperRef}
        >
          Enter
        </BetchaCantClickMe>
      </div>
    </div>
  )
}
