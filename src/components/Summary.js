import React from 'react'

export function Summary({ time }) {
  return (
    <div className="fg layer">
      <div className="w-100 h-100 flex flex-column justify-center items-center">
        <div className="f1 ma2">🎉 WOW 🎉</div>
        <div className="f3">You made it in {time / 1000} seconds</div>
      </div>
      <div
        className="absolute bottom-0 vw-100 f6 mv3"
        style={{ color: '#c1c7cd', textAlign: 'center' }}
      >
        Made with 💙 by{' '}
        <a href="https://github.com/ivanross" target="_blank" rel="noopener noreferrer">
          Ivan
        </a>
      </div>
    </div>
  )
}
