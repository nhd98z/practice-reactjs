import React, { memo, useRef } from 'react'

export default memo(function TestUseRefWithInput() {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input ref={ref} />
      <button
        onClick={() => {
          console.log(`ref.current`, '<' + (ref.current && ref.current.value) + '>')
        }}
      >
        console.log ref.current.value
      </button>
    </div>
  )
})
