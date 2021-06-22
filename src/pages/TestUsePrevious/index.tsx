import { useEffect, useRef, useState } from 'react'

// modified from https://usehooks.com/usePrevious/
export function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export default function TestUsePrevious() {
  const [value, setValue] = useState(0)

  const prevValue = usePrevious(value)

  return (
    <>
      <h1>Value: {value}</h1>
      <h1>Prev Value: {prevValue}</h1>
      <button
        onClick={() => {
          setValue((prev) => prev + 0.1234)
        }}
      >
        Increase
      </button>
    </>
  )
}
