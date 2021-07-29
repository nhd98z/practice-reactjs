import React, { DependencyList, useCallback, useEffect, useRef, useState } from 'react'
import faker from 'faker'

const fakeNames = Array.from(Array(100), () => {
  return faker.name.findName()
})

type Fn = (...args: any) => void

function useDebounceFn(fn: Fn, ms: number, deps: DependencyList = []) {
  // Tạo ra `fn` và `ms` Để đảm bảo việc `fn` và `ms` bị recreate ở component gọi `useDebounceFn` không ảnh hưởng tới `useDebounceFn`.
  const callback = useRef(fn)
  const delay = useRef(ms)
  useEffect(() => {
    callback.current = fn
    delay.current = ms
  }, [fn, ms])

  const timeout = useRef<ReturnType<typeof setTimeout>>()
  // Ý tưởng của debounce là mỗi lần run hàm sẽ clearTimeout rồi setTimeout lại.
  const run = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      callback.current()
    }, delay.current)
  }, [])

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(run, [run, ...deps])
}

/**
 * useThrottleFn không cần clearTimeout, nó đảm bảo sẽ không chạy `fn` khi hook unMount.
 */
function useThrottleFn(fn: Fn, ms: number, deps: DependencyList = []) {
  // Tạo ra `fn` và `ms` Để đảm bảo việc `fn` và `ms` bị recreate ở component gọi `useThrottleFn` không ảnh hưởng tới `useThrottleFn`.
  const callback = useRef(fn)
  const delay = useRef(ms)
  useEffect(() => {
    callback.current = fn
    delay.current = ms
  }, [fn, ms])

  const timeout = useRef<ReturnType<typeof setTimeout>>()
  // Ý tưởng của throttle là chỉ khi timeout đang rảnh thì mới chạy.
  const run = useCallback(() => {
    if (timeout.current === undefined) {
      callback.current()
      timeout.current = setTimeout(() => {
        timeout.current && clearTimeout(timeout.current)
        timeout.current = undefined
      }, delay.current)
    }
  }, [])

  useEffect(run, [run, ...deps])
}

export default function ImplementDebounceAndThrottle() {
  const [text, setText] = useState<string>('')
  const [filteredNames, setFilteredNames] = useState<string[]>(fakeNames)
  const [count, setCount] = useState(0)
  const [throttledCount, setThrottledCount] = useState(0)

  useDebounceFn(
    () => setFilteredNames(fakeNames.filter((name) => name.toLowerCase().includes(text.toLowerCase()))),
    500,
    [text]
  )

  useThrottleFn(() => setThrottledCount((prev) => prev + 1), 500, [count, text])

  return (
    <div>
      <input
        placeholder="debounce search list"
        value={text}
        onChange={({ currentTarget }) => setText(currentTarget.value)}
      />
      <button onClick={() => setCount((prev) => prev + 1)}>Click so fast many times to see throttle</button>
      <p>count: {count}</p>
      <p>throttled count: {throttledCount}</p>
      {filteredNames.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  )
}
