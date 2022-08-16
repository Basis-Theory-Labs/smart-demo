import React from 'react';
import { Grid } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { SetupForm } from '@/components/SetupForm';

interface Props {
  done?: boolean;
}

const Home: NextPage<Props> = ({ done }) => (
  <Grid container direction="column" justifyContent="center" spacing={2}>
    <Grid item>
      <ApplicationPanel subtitle="Enter your Application Keys" title="Setup">
        <SetupForm done={done} />
      </ApplicationPanel>
    </Grid>
  </Grid>
);

export const getServerSideProps: GetServerSideProps = () =>
  Promise.resolve({
    props: {
      done: Boolean(global.privateApiKey && global.publicApiKey),
    },
  });

export default Home;
