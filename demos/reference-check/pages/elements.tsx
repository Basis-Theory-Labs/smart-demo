import React from 'react';
import { Grid } from '@mui/material';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { FormWithElements } from '@/components/FormWithElements';
import { getServerSidePropsWithSession } from '@/server/session';

const Elements = () => (
  <Grid container direction="column" justifyContent="center" spacing={2}>
    <Grid item>
      <ApplicationPanel>
        <FormWithElements />
      </ApplicationPanel>
    </Grid>
    <Grid item>
      <DatabaseTable />
    </Grid>
  </Grid>
);

export const getServerSideProps = getServerSidePropsWithSession((_, session) =>
  Promise.resolve({
    props: {
      // eslint-disable-next-line unicorn/no-null
      publicApiKey: session.publicApiKey || null,
    },
  })
);

export default Elements;
