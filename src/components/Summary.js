import React, { useEffect, useState } from 'react'
import { setBgColor } from '../lib/transition'
import * as API from '../lib/firebase'
import { Footer } from './Footer'
import { FOOTER_HEIGHT } from '../lib/contants'

function scrollToCurrent() {
  setTimeout(() => {
    const el = document.querySelector('.summary-table .current')
    if (!el) scrollToCurrent()
    else {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      setTimeout(() => {
        document.querySelector('.summary-table-wrapper').classList.remove('pointer-events-none')
      }, 1000)
    }
  }, 10)
}

export function Summary({ chronometer, nickname, lvl }) {
  const [scores, setScores] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => setBgColor(document.body, '#1cb5e0'), [])
  useEffect(() => {
    ;(async () => {
      setId(await API.writeScore(chronometer.total(), nickname.trim(), lvl))
      setScores(await API.readScores())
      scrollToCurrent()
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fg layer">
      <div
        className="w-100 flex flex-column black pa3"
        style={{ height: `calc(100% - ${FOOTER_HEIGHT}px)` }}
      >
        <div className="flex flex-column items-center">
          <div className="f1 white kalam">MIND BLOWING</div>
          <div className="f3 ">You made it in {chronometer.time / 1000} seconds</div>
        </div>
        <div className="summary-table-wrapper flex-auto overflow-scroll pointer-events-none">
          <table className="summary-table permanent-marker">
            <colgroup>
              <col span="1" style={{ width: 80 }} />
              <col span="1" />
              <col span="1" />
            </colgroup>

            <thead>
              <tr>
                <th />
                <th>nickname</th>
                <th>total time</th>
              </tr>
            </thead>
            <tbody>
              {scores &&
                scores.map((s, i) => (
                  <tr key={s.id} className={s.id === id ? 'current' : ''}>
                    <td>{i + 1}.</td>
                    <td className={!s.nickname ? 'missing-nickname' : ''}>{s.nickname || '???'}</td>
                    <td>{s.time} sec</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer dark />
    </div>
  )
}
