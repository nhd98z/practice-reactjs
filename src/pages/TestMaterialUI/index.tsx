import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Paper, useMediaQuery } from '@material-ui/core';
import { useToggle } from 'react-use';
import styled from '@emotion/styled';
import { orange } from '@material-ui/core/colors';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {},
});

const StyledButton = styled(Button)`
  background-color: ${orange[500]};
  color: #fff;

  :hover {
    background-color: ${orange[700]};
  }
`;

export default function TestMaterialUI() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, toggleTheme] = useToggle(prefersDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Paper style={{ minHeight: '200px' }}>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <StyledButton variant="contained" onClick={toggleTheme}>
          Toggle theme
        </StyledButton>
      </Paper>
    </ThemeProvider>
  );
}
