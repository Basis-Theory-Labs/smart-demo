import React, { useState } from 'react';
import { Grid } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { FormWithElements } from '@/components/FormWithElements';
import { Response } from '@/components/Response';

const Proxy = () => {
  const [data, setData] = useState<unknown>();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleData = (d: unknown) => {
    setData(d);
    setExpanded(true);
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <ApplicationPanel>
          <FormWithElements onSubmit={handleData} path="/api/reference-check" />
        </ApplicationPanel>
      </Grid>
      <Grid item>
        <DatabaseTable />
      </Grid>
      <Grid item>
        <Response data={data} expanded={expanded} onExpanded={setExpanded} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = () =>
  Promise.resolve({
    props: {
      // eslint-disable-next-line unicorn/no-null
      publicApiKey: global.publicApiKey || null,
    },
  });

export default Proxy;
