import React from 'react';
import { Grid } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { FormWithElements } from '@/components/FormWithElements';

const WithElements = () => (
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

export const getServerSideProps: GetServerSideProps = () =>
  Promise.resolve({
    props: {
      // eslint-disable-next-line unicorn/no-null
      publicApiKey: global.publicApiKey || null,
    },
  });

export default WithElements;
