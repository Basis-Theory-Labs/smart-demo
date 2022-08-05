import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Link,
  ThemeProvider,
} from '@mui/material';
import type { AppProps } from 'next/app';
import NextLink from 'next/link';
import { blissDark } from '@/components/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={blissDark}>
    <CssBaseline />
    <Container>
      <Box display="flex" p={1}>
        <NextLink href="/" passHref>
          <Link>{'Original Form'}</Link>
        </NextLink>
        <NextLink href="/with-elements" passHref>
          <Link sx={{ ml: 2 }}>{'With Elements'}</Link>
        </NextLink>
      </Box>
      <Component {...pageProps} />
    </Container>
  </ThemeProvider>
);

export default MyApp;
