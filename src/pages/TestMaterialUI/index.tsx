/**
 * 2021/07/05: mới chỉ thử button, chưa quản lý được theme tốt.
 */

import Button from '@material-ui/core/Button'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { useToggle } from 'react-use'
import styled from '@emotion/styled'
import { orange } from '@material-ui/core/colors'

const lightTheme = createTheme({
  palette: {
    type: 'light',
  },
})

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
})

const StyledButton = styled(Button)`
  background-color: ${orange[500]};
  color: #fff;

  :hover {
    background-color: ${orange[700]};
  }
`

export default function TestMaterialUI() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, toggleTheme] = useToggle(prefersDarkMode)

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
      <StyledButton variant="contained" onClick={toggleTheme}>
        Toggle Theme Button (Styled Components)
      </StyledButton>
    </ThemeProvider>
  )
}
