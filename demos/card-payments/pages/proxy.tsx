import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { DatabaseTable } from '@/components/DatabaseTable';
import { Response } from '@/components/Response';
import { getServerSidePropsWithSession } from '@/server/session';
import type { EchoResponse } from '@/types';

const Proxy = () => {
  const [data, setData] = useState<EchoResponse>();
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <DatabaseTable />
      </Grid>
      <Grid item>
        <Response data={data} expanded={expanded} onExpanded={setExpanded} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = getServerSidePropsWithSession((_, session) =>
  Promise.resolve({
    props: {
      publicApiKey: session.publicApiKey || null,
    },
  })
);

export default Proxy;
