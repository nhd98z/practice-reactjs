import React, { forwardRef, memo, useEffect, useRef } from 'react'

const ForwardRefComponent = forwardRef(function ForwardRefComponent(props: any, ref: any) {
  return (
    <div>
      <p>ok</p>
      <p>ok</p>
      <p>ok</p>
      <p>ok</p>
      <p>ok</p>
      <p>ok</p>
      <p>ok</p>
      <h1 ref={ref} style={{ margin: '100px', border: '10px solid black' }}>
        Hello World.
      </h1>
    </div>
  )
})

const MemorizedForwardRefComponent = memo(ForwardRefComponent)

export default memo(function TestForwardRef() {
  const ref = useRef<HTMLHeadElement>()

  useEffect(() => {
    if (ref !== undefined && ref.current !== undefined) {
      const cur = ref.current
      cur.style.backgroundColor = 'red'
      console.log(`getBoundingClientRect`, cur.getBoundingClientRect())
      console.log(`offsetLeft`, cur.offsetLeft)
      console.log(`clientLeft`, cur.clientLeft)
      console.log(`offsetTop`, cur.offsetTop)
      console.log(`clientTop`, cur.clientTop)
      console.log(`offsetHeight`, cur.offsetHeight)
      console.log(`clientHeight`, cur.clientHeight)
      console.log(`offsetWidth`, cur.offsetWidth)
      console.log(`clientWidth`, cur.clientWidth)
    }
  }, [])

  return (
    <div style={{ position: 'relative', background: 'yellow' }}>
      <MemorizedForwardRefComponent ref={ref} />
    </div>
  )
})
