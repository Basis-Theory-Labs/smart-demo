import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { FormWithFingerprint } from '@/components/FormWithFingerprint';
import { Response } from '@/components/Response';
import { getServerSidePropsWithSession } from '@/server/session';
import type { EchoResponse } from '@/types';

const Proxy = () => {
  const [data, setData] = useState<EchoResponse>();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleData = (d: unknown) => {
    setData(d as EchoResponse);
    setExpanded(true);
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <ApplicationPanel>
          <FormWithFingerprint
            onSubmit={handleData}
            path="/api/reference-check"
          />
        </ApplicationPanel>
      </Grid>
      <Grid item>
        <DatabaseTable showSsn />
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
