import React, { memo, useCallback, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Con = memo(function Con({ count, aFunction }: any) {
  const renderCount = useRef(0)
  renderCount.current++

  return (
    <div>
      <h1>Con component: {renderCount.current}</h1>
      <p>Con count: {count}</p>
    </div>
  )
})

function Bố() {
  const renderCount = useRef(0)
  renderCount.current++

  const [count, setCount] = useState(0)

  // Mỗi lần Bố's component re-render thì một object mới (ở một địa chỉ mới trong bộ nhớ) được tạo và gán cho aFunction
  // ==> aFunction mới !== aFunction cũ
  const aFunction = useCallback(() => {
    // nothing
  }, [])

  return (
    <div>
      <h1>Bố component: {renderCount.current}</h1>
      <p>Bố count: {count}</p>
      <button
        onClick={() => {
          setCount((prev) => prev + 1)
        }}
      >
        inc count
      </button>
      <hr />
      <Con aFunction={aFunction} />
    </div>
  )
}

export default function TestFunctionalComponentRerender() {
  return (
    <div>
      <h1>TestFunctionalComponentRerender</h1>
      <h4>Test khi nào functional component bị re-render.</h4>
      <hr />
      <Bố />
    </div>
  )
}
