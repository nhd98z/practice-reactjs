import { CountUp } from 'use-count-up'
import { useEffect, useState } from 'react'
import { usePrevious } from '../04_TestUsePrevious'

export default function TestUseCountUp() {
  const [count, setCount] = useState(1000)
  const prevCount = usePrevious(count)

  useEffect(() => {
    setCount((prev) => prev + 1234)
  }, [])

  return (
    <>
      <h1>
        <CountUp autoResetKey={count} isCounting start={prevCount} end={count} thousandsSeparator={','} duration={5} />
      </h1>
      <button
        onClick={() => {
          setCount((prev) => prev + 1234)
        }}
      >
        inc
      </button>
    </>
  )
}
