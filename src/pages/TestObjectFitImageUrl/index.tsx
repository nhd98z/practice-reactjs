import React, { memo } from 'react'
import { css } from '@emotion/css'

export default memo(function TestObjectFitImageUrl() {
  const src =
    'https://firebasestorage.googleapis.com/v0/b/bitglobal-a84d5.appspot.com/o/land%2Fimages%2F9%2F9_1.jpg?alt=media&token=c409719a-da7c-474e-ae48-8203b7abe970'
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
          width: 480px;
          height: 360px;
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
          width: 480px;
          height: 360px;
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
