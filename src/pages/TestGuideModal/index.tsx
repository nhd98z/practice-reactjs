import React, { useCallback, useState } from 'react'
import { css } from '@emotion/css'
import { Button } from '@material-ui/core'

export default function TestGuideModal() {
  const [text1, setText1] = useState('Button 1')
  const [text2, setText2] = useState('Button 2')
  const [text3, setText3] = useState('Button 3')
  const [rect1, setRect1] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [rect2, setRect2] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [rect3, setRect3] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [highlightElement, setHighlightElement] = useState<'rect1' | 'rect2' | 'rect3' | undefined>()

  const openGuide = () => {
    setHighlightElement('rect1')
  }

  const handleRect1 = useCallback((node: HTMLButtonElement | null) => {
    if (!node) return
    const { width, height } = node.getBoundingClientRect()
    const { offsetTop: x, offsetLeft: y } = node
    setRect1({ x, y, width, height })
  }, [])

  const handleRect2 = useCallback((node: HTMLButtonElement | null) => {
    if (!node) return
    const { width, height } = node.getBoundingClientRect()
    const { offsetTop: x, offsetLeft: y } = node
    setRect2({ x, y, width, height })
  }, [])

  const handleRect3 = useCallback((node: HTMLButtonElement | null) => {
    if (!node) return
    const { width, height } = node.getBoundingClientRect()
    const { offsetTop: x, offsetLeft: y } = node
    setRect3({ x, y, width, height })
  }, [])

  const Modal = () => {
    console.log(`rect1`, rect1)
    console.log(`rect2`, rect2)
    console.log(`rect3`, rect3)

    return (
      <div
        className={css`
          position: absolute;
          width: 100%;
          min-height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 2147483647;
        `}
      >
        {highlightElement === 'rect1' ? (
          <div
            className={css`
              position: absolute !important;
              top: ${rect1.x}px;
              left: ${rect1.y}px;
            `}
          >
            <Button
              variant="contained"
              onClick={() => {
                setText1('Clicked')
                setHighlightElement('rect2')
              }}
            >
              {text1}
            </Button>
          </div>
        ) : highlightElement === 'rect2' ? (
          <div
            className={css`
              position: absolute !important;
              top: ${rect2.x}px;
              left: ${rect2.y}px;
            `}
          >
            <Button
              variant="contained"
              onClick={() => {
                setText2('Clicked')
                setHighlightElement('rect3')
              }}
            >
              {text2}
            </Button>
          </div>
        ) : highlightElement === 'rect3' ? (
          <div
            className={css`
              position: absolute !important;
              top: ${rect3.x}px;
              left: ${rect3.y}px;
            `}
          >
            <Button
              variant="contained"
              onClick={() => {
                setText3('Clicked')
                setHighlightElement(undefined)
              }}
            >
              {text3}
            </Button>
          </div>
        ) : null}
      </div>
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
        ref={handleRect1}
        className={css`
          position: absolute !important;
          top: 10vh;
          left: 10vw;
        `}
        onClick={() => setText1('Clicked')}
      >
        {text1}
      </Button>
      <Button
        variant="contained"
        ref={handleRect2}
        className={css`
          position: absolute !important;
          top: 50vh;
          left: 40vw;
        `}
        onClick={() => setText2('Clicked')}
      >
        {text2}
      </Button>
      <Button
        variant="contained"
        ref={handleRect3}
        className={css`
          position: absolute !important;
          top: 10vh;
          left: 70vw;
        `}
        onClick={() => setText3('Clicked')}
      >
        {text3}
      </Button>
    </div>
  )
}
