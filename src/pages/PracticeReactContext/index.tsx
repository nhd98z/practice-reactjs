// Lâu ngày không sử dụng, đã quên mất cách dùng React Context, nay luyện tập lại để nhớ.

import { useState } from 'react'
import ApplicationContextProvider from './contexts/Application'
import { useCountManager } from './contexts/Application/hooks'

function PracticeReactContext() {
  const [count, { increaseCount, decreaseCount }] = useCountManager()
  const [amount, setAmount] = useState(0)

  return (
    <>
      <h1>Count: {count}</h1>
      <input type="number" value={amount} onChange={(e) => setAmount(+e.currentTarget.value)} />
      <button onClick={() => increaseCount(amount)}>increase</button>
      <button onClick={() => decreaseCount(amount)}>decrease</button>
    </>
  )
}

export default function PracticeReactContextWrapper() {
  return (
    <ApplicationContextProvider>
      <PracticeReactContext />
    </ApplicationContextProvider>
  )
}
