import React from 'react';
import { Grid } from '@mui/material';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { SearchForm } from '@/components/SearchForm';
import { getServerSidePropsWithSession } from '@/server/session';

const Proxy = () => (
  <Grid container direction="column" justifyContent="center" spacing={2}>
    <Grid item>
      <ApplicationPanel subtitle="" title="Driver Search">
        <SearchForm />
      </ApplicationPanel>
    </Grid>
    <Grid item>
      <DatabaseTable showSsn />
    </Grid>
  </Grid>
);

export const getServerSideProps = getServerSidePropsWithSession((_, session) =>
  Promise.resolve({
    props: {
      publicApiKey: session.publicApiKey || null,
    },
  })
);

export default Proxy;
