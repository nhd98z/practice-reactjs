import { useCountUp } from 'use-count-up'
import { useState } from 'react'

export default function TestUseCountUp() {
  const [count, setCount] = useState({ prev: 0, curr: 1000 })

  const { value, reset } = useCountUp({
    isCounting: true,
    start: count.prev,
    end: count.curr,
    duration: 0.3,
    thousandsSeparator: ',',
  })

  return (
    <>
      <h1>{value}</h1>
      <button
        onClick={() => {
          setCount((count) => ({ prev: count.curr, curr: count.curr + 1000 }))
          reset()
        }}
      >
        inc
      </button>
    </>
  )
}
