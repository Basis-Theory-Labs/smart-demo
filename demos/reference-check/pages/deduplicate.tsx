import React from 'react';
import { Grid } from '@mui/material';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { FormWithFingerprint } from '@/components/FormWithFingerprint';
import { getServerSidePropsWithSession } from '@/server/session';

const Deduplicate = () => (
  <Grid container direction="column" justifyContent="center" spacing={2}>
    <Grid item>
      <ApplicationPanel>
        <FormWithFingerprint />
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

export default Deduplicate;
