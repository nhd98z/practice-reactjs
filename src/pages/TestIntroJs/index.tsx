import React, { useEffect, useState } from 'react'
import introJs from 'intro.js'
import 'intro.js/introjs.css'
import './index.scss'
import { css } from '@emotion/css'
import { Button } from '@material-ui/core'

export default function TestIntroJs() {
  const [text1, setText1] = useState('Button 1')
  const [text2, setText2] = useState('Button 2')
  const [text3, setText3] = useState('Button 3')
  const [step, setStep] = useState(0)

  console.log(`I'm here: `)

  useEffect(() => {
    if (step !== 0) {
      introJs()
        .setOptions({
          exitOnOverlayClick: false,
        })
        .start()
        .goToStep(step)
    }
  }, [step])

  const onExit = () => {
    setStep(0)
    introJs().exit()
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
      <Button variant="contained" color="primary" onClick={() => setStep(1)}>
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
        `}
        onClick={() => {
          setText1('Clicked')
        }}
        data-intro="Hello step one!"
        data-step={1}
      >
        {text1}
      </Button>
      <Button
        variant="contained"
        className={css`
          position: absolute !important;
          top: 50vh;
          left: 40vw;
        `}
        onClick={() => {
          setText2('Clicked')
        }}
        data-intro="Hello step two!"
        data-step={2}
      >
        {text2}
      </Button>
      <Button
        variant="contained"
        className={css`
          position: absolute !important;
          top: 10vh;
          left: 70vw;
        `}
        onClick={() => {
          setText3('Clicked')
        }}
        data-intro="Hello step three!"
        data-step={3}
      >
        {text3}
      </Button>
      {step > 1 && (
        <Button
          variant="contained"
          color="primary"
          className={css`
            position: absolute !important;
            top: 40vh;
            left: 2.5vw;
            z-index: 2147483647;
          `}
          onClick={() => setStep((prev) => prev - 1)}
        >
          Prev
        </Button>
      )}
      {step > 0 && step < 3 && (
        <Button
          variant="contained"
          color="primary"
          className={css`
            position: absolute !important;
            top: 40vh;
            right: 2.5vw;
            z-index: 2147483647;
          `}
          onClick={() => setStep((prev) => prev + 1)}
        >
          Next
        </Button>
      )}

      {step > 0 && (
        <Button
          variant="contained"
          color="primary"
          className={css`
            position: absolute !important;
            top: 10vh;
            right: 2.5vw;
            z-index: 2147483647;
            font-size: 5rem;
          `}
          onClick={onExit}
        >
          X
        </Button>
      )}
    </div>
  )
}
