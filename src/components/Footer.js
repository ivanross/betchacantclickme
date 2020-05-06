import React from 'react'

export const Footer = ({ dark }) => (
  <div
    id="footer"
    className="absolute bottom-0 vw-100 f6 mv3"
    style={{ color: dark ? '#21272a' : '#c1c7cd', textAlign: 'center' }}
  >
    Made with {dark ? '❤️' : '💙'} by{' '}
    <a
      style={{ color: dark ? 'black' : 'white' }}
      href="https://github.com/ivanross"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ivan
    </a>
  </div>
)
