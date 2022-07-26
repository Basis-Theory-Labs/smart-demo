import type { AppProps } from 'next/app'
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({})


function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Component {...pageProps} />
    </Container>
  </ThemeProvider>
}

export default MyApp
