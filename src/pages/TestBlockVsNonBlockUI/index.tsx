import React, { useEffect, useState } from 'react'

export default function TestBlockVsNonBlockUI() {
  const [count, setCount] = useState(0)

  const blockedWhileLoop = () => {
    setCount(0)
    let stopped = false
    setTimeout(() => {
      stopped = true
    }, 0)
    while (!stopped) {}
  }

  const nonBlockedWhileLoop = () => {
    setCount(0)
    let stopped = false
    setTimeout(() => {
      stopped = true
    }, 0)
    setTimeout(() => {
      while (!stopped) {}
    }, 0)
  }

  const blockedForEach = () => {
    setCount(0)
    Array.from(Array(3e4).keys()).forEach(async () => {
      await new Promise((r) => setTimeout(r, 1000))
    })
  }

  const nonBlockedForEach = () => {
    setCount(0)
    Array.from(Array(3e4).keys()).forEach(async () => {
      setTimeout(async () => {
        await new Promise((r) => setTimeout(r, 1000))
      }, 0)
    })
  }

  useEffect(() => {
    const itv = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 10)
    return () => clearInterval(itv)
  }, [])

  return (
    <div>
      <div>
        nếu cái biến <pre style={{ display: 'inline', fontSize: '1.5rem' }}>count</pre> không chạy nữa có nghĩa toàn bộ
        UI và cái tab này bị đơ cmmr
      </div>
      <p style={{ position: 'absolute', bottom: 0, right: 0, fontSize: '5rem' }}>count: {count}</p>
      <button onClick={blockedWhileLoop}>Run blockedWhileLoop: ấn phát đơ luôn</button>
      <br />
      <button onClick={nonBlockedWhileLoop}>
        Run nonBlockedWhileLoop: ấn thoải mái, vì while loop sẽ chạy sau khi stopped được gán = true
      </button>
      <br />
      <button onClick={blockedForEach}>
        Run blockedForEach: ở đầu hàm có setCount(0) rồi mới chạy forEach, nhưng bạn sẽ không thể thấy được điều này.
      </button>
      <br />
      <button onClick={nonBlockedForEach}>
        Run nonBlockedForEach: ở đầu hàm có setCount(0) rồi mới chạy forEach, bạn sẽ thấy nó nháy 0 rồi mới nhảy số, có
        nghĩa là việc setState đã len lỏi vào giữa quá trình chạy forEach.
      </button>
    </div>
  )
}
