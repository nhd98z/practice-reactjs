import React, { useState } from 'react'
import { css } from '@emotion/css'
import { Button } from '@material-ui/core'

export default function TestGuideModal() {
  const [text1, setText1] = useState('Button 1')
  const [text2, setText2] = useState('Button 2')
  const [text3, setText3] = useState('Button 3')
  const [highlightElement, setHighlightElement] = useState<'rect1' | 'rect2' | 'rect3' | undefined>()

  const openGuide = () => {
    setHighlightElement('rect1')
  }

  const Modal = () => {
    return (
      <div
        className={css`
          position: absolute;
          width: 100%;
          min-height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99;
        `}
      />
    )
  }

  return (
    <div
      className={css`
        min-height: 70vh;
        width: 100vw;
        background-color: lightgray;
        position: relative;
      `}
    >
      <h1>đây là code thuần</h1>
      {highlightElement && <Modal />}
      <Button variant="contained" color="primary" onClick={openGuide}>
        Open Guide Modal
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setText1('Button 1')
          setText2('Button 2')
          setText3('Button 3')
        }}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        className={css`
          position: absolute !important;
          top: 10vh;
          left: 10vw;
          z-index: ${highlightElement === 'rect1' ? 100 : 'auto'};
        `}
        onClick={() => {
          setText1('Clicked')
          setHighlightElement('rect2')
        }}
      >
        {text1}
      </Button>
      <Button
        variant="contained"
        className={css`
          position: absolute !important;
          top: 50vh;
          left: 40vw;
          z-index: ${highlightElement === 'rect2' ? 100 : 'auto'};
        `}
        onClick={() => {
          setText2('Clicked')
          setHighlightElement('rect3')
        }}
      >
        {text2}
      </Button>
      <Button
        variant="contained"
        className={css`
          position: absolute !important;
          top: 10vh;
          left: 70vw;
          z-index: ${highlightElement === 'rect3' ? 100 : 'auto'};
        `}
        onClick={() => {
          setText3('Clicked')
          setHighlightElement(undefined)
        }}
      >
        {text3}
      </Button>
    </div>
  )
}
