import React from 'react'
import { css } from '@emotion/css'
import { RemoveScroll } from 'react-remove-scroll'
import { useToggle } from 'react-use'

export default function TestRemoveScroll() {
  const [isRemove, toggleRemove] = useToggle(false)

  return (
    <div>
      <h1>TestRemoveScroll</h1>
      <button onClick={() => toggleRemove()}>toggleRemove</button>
      {isRemove && <span>removed scroll</span>}
      <RemoveScroll enabled={isRemove} allowPinchZoom>
        <div
          className={css`
            background: orange;
            width: 200px;
            height: 1200px;
          `}
        />
      </RemoveScroll>
    </div>
  )
}
