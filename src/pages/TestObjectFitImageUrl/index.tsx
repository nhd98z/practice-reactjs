import React, { memo } from 'react'
import { css } from '@emotion/css'

export default memo(function TestObjectFitImageUrl() {
  const src = 'https://picsum.photos/480/360'
  return (
    <div
      className={css`
        position: relative;
        width: 100%;
        min-height: 400px;
      `}
    >
      <div
        className={css`
          border: 5px solid black;
          position: absolute;
          width: 500px;
          height: 200px;
          left: 10%;
          top: 10%;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${src});
          background-size: cover;
        `}
      />
      <img
        src={src}
        alt="image"
        className={css`
          border: 5px solid black;
          position: absolute;
          width: 500px;
          height: 200px;
          right: 10%;
          top: 10%;
          object-fit: cover;
        `}
      />
      <img
        src={src}
        alt="image"
        className={css`
          border: 5px solid black;
          position: absolute;
          right: 10%;
          top: 300px;
        `}
      />
    </div>
  )
})
