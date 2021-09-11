import React from 'react'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { css } from '@emotion/css'
import { useRect } from '@reach/rect'

function TestReachRect() {
  const ref = React.useRef(null)
  const rect = useRect(ref)

  return (
    <div>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
      <div
        ref={ref}
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Edit this to change the size!',
        }}
      />
    </div>
  )
}

function TestReachDialog() {
  const [showDialog, setShowDialog] = React.useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <div>
      <button onClick={open}>Open Dialog</button>
      <Dialog isOpen={showDialog} onDismiss={close} aria-label="dialog">
        <button className="close-button" onClick={close}>
          <div>Close</div>
          <span>×</span>
        </button>
        <p>Hello there. I am a dialog</p>
      </Dialog>
      <div
        className={css`
          min-height: 1200px;
          background: orange;
        `}
      />
    </div>
  )
}

export default function TestReachUi() {
  return (
    <div>
      <h1>TestReach Rect</h1>
      <TestReachRect />
      <h1>TestReach Dialog</h1>
      <TestReachDialog />
    </div>
  )
}
