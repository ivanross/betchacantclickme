import React, { useState } from 'react'
import { Lvl1 } from './Lvl1'
import { Lvl2 } from './Lvl2'
import { Lvl3 } from './Lvl3'
import { Summary } from './Summary'
import { Nonono } from './Nonono'
import { useMousePositionRef } from '../hooks/useMousePositionRef'
import { useChronometer } from '../hooks/useChronometer'
import { useIncrement } from '../hooks/useIncrement'
import { useDevTool } from '../hooks/useDevTool'
import { IS_DEBUG } from '../lib/contants'

const levels = [Lvl1, Lvl2, Lvl3, Summary]

export function App() {
  const [mouseListenerRef, mousePosRef] = useMousePositionRef()
  const [nickname, setNickname] = useState('')
  const [lvl, nextLvl] = useIncrement(0)
  const isDevToolOpen = useDevTool()
  const chronometer = useChronometer()

  const CurrentLvl = levels[lvl]

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
          lvl={lvl}
        />
      </div>
      {!IS_DEBUG && isDevToolOpen && <Nonono />}
    </>
  )
}
