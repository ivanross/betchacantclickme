import React, { useState } from 'react'
import { Lvl1 } from './Lvl1'
import { Lvl2 } from './Lvl2'
import { Summary } from './Summary'
import { Nonono } from './Nonono'
import { useMousePositionRef } from '../hooks/useMousePositionRef'
import { useChronometer } from '../hooks/useChronometer'
import { useIncrement } from '../hooks/useIncrement'
import { useDevTool } from '../hooks/useDevTool'

export function App() {
  const [mouseListenerRef, mousePosRef] = useMousePositionRef()
  const [nickname, setNickname] = useState('')
  const [lvl, nextLvl] = useIncrement(1)
  const isDevToolOpen = useDevTool()
  const chronometer = useChronometer()

  const CurrentLvl = lvl === 1 ? Lvl1 : lvl === 2 ? Lvl2 : Summary

  return (
    <>
      <div id="wrapper" ref={mouseListenerRef} className="layer">
        <CurrentLvl
          chronometer={chronometer}
          nickname={nickname}
          onNicknameChange={setNickname}
          mousePosRef={mousePosRef}
          onLevelCompleted={nextLvl}
          wrapperRef={mouseListenerRef}
        />
      </div>
      {isDevToolOpen && <Nonono />}
    </>
  )
}
