import { useEffect, useRef } from 'react'

export default function useRender() {
  const ref = useRef(1)

  useEffect(() => {
    ref.current++
  })

  return ref.current
}
