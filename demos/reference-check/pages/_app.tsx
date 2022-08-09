import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Navigation } from '@/components/Navigation';
import { blissDark } from '@/components/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{'Reference Check'}</title>
    </Head>
    <ThemeProvider theme={blissDark}>
      <CssBaseline />
      <Navigation />
      <Container sx={{ mt: 3 }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  </>
);

export default MyApp;
