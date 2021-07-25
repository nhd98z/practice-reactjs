import React, { useEffect } from 'react'
import { Button, Card, FocusStyleManager } from '@blueprintjs/core'
import './index.css'
import { useMediaQuery } from '@material-ui/core'
import { useToggle } from 'react-use'

export default function TestBlueprintJS() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, toggleTheme] = useToggle(prefersDarkMode)

  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs()
  }, [])

  return (
    <Card className={isDarkMode ? 'bp3-dark' : undefined}>
      <p>
        Khi vào page này thì toàn bộ css được import bởi thư viện @blueprintjs sẽ ăn cả project, do đó thanh navbar sẽ
        được style lại.
      </p>
      <Button icon="refresh" intent="primary" text="Reset" />
      <br />
      <br />
      <Button icon="refresh" intent="none" text="Toggle theme" onClick={toggleTheme} />
    </Card>
  )
}
