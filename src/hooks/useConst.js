import { useRef } from 'react'

export function useConst(val) {
  return useRef(val).current
}
