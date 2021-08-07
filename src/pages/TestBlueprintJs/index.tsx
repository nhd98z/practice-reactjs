import React, { useEffect } from 'react'
import { Button, Card, Elevation, FocusStyleManager } from '@blueprintjs/core'
import './index.scss'
import { useMediaQuery } from '@material-ui/core'
import { useToggle } from 'react-use'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  background: red;
`

export default function TestBlueprintJS() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, toggleTheme] = useToggle(prefersDarkMode)

  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs()
  }, [])

  return (
    <Card className={isDarkMode ? 'bp3-dark' : undefined} elevation={Elevation.ZERO}>
      <p>
        Khi vào page này thì toàn bộ css được import bởi thư viện @blueprintjs sẽ ăn cả project, do đó thanh navbar sẽ
        được style lại.
      </p>
      <p>BlueprintJS được làm ra để sử dụng với SCSS, không để sử dụng với CSS in JS.</p>
      <p>Nó cũng không hỗ trợ dark mode tốt.</p>
      <p>Tóm lại sẽ không chọn thằng này.</p>
      <Button intent="primary" text="primary" />
      <Button intent="success" text="success" />
      <Button intent="warning" text="warning" />
      <Button intent="danger" text="danger" />
      <Button intent="none" text="none" />
      <StyledButton text="Styled components don't work" />
      <br />
      <br />
      <Button intent="none" text="Toggle theme" onClick={toggleTheme} />
    </Card>
  )
}
