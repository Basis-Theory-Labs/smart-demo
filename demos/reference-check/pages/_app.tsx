import type {AppProps} from 'next/app'
import {Box, Container, createTheme, CssBaseline, Link, ThemeProvider} from "@mui/material";
import NextLink from 'next/link'

const theme = createTheme({})


function MyApp({Component, pageProps}: AppProps) {
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container>
            <Box p={1} display="flex">
                <NextLink href="/" passHref>
                    <Link>
                        Original Form
                    </Link>
                </NextLink>
                <NextLink href="/with-elements" passHref>
                    <Link sx={{ml: 2}}>
                        With Elements
                    </Link>
                </NextLink>
            </Box>
            <Component {...pageProps} />
        </Container>
    </ThemeProvider>
}

export default MyApp
