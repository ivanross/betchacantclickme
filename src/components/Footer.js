import React from 'react'
import { FOOTER_HEIGHT } from '../lib/contants'

export const Footer = ({ dark }) => (
  <div
    id="footer"
    className="absolute bottom-0 vw-100 f6 flex justify-center items-center"
    style={{ color: dark ? '#21272a' : '#c1c7cd', textAlign: 'center', height: FOOTER_HEIGHT }}
  >
    <div>
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
  </div>
)
