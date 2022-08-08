import React from 'react';
import {
  useBasisTheory,
  BasisTheoryProvider,
} from '@basis-theory/basis-theory-react';
import { Grid } from '@mui/material';
import { ApplicationPanel } from '@/components/ApplicationPanel';
import { DatabaseTable } from '@/components/DatabaseTable';
import { FormWithElements } from '@/components/FormWithElements';

const ELEMENTS_API_KEY = 'key_XVB48UzHJ57TdPtmLhJa9e';

const WithElements = () => {
  const { bt } = useBasisTheory(ELEMENTS_API_KEY, {
    elements: true,
  });

  return (
    <BasisTheoryProvider bt={bt}>
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
    </BasisTheoryProvider>
  );
};

export default WithElements;
