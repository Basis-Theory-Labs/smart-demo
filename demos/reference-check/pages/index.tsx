import React from 'react';
import { Grid } from '@mui/material';
import type { NextPage } from 'next';
import { DatabaseTable } from '../components/DatabaseTable';
import { OriginalForm } from '../components/OriginalForm';

const Home: NextPage = () => (
  <Grid container direction="column" justifyContent="center" spacing={2}>
    <Grid item>
      <OriginalForm />
    </Grid>
    <Grid item>
      <DatabaseTable />
    </Grid>
  </Grid>
);

export default Home;
