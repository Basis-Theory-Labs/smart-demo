import React, { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';

const MigrationForm = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <LoadingButton
        loading={loading}
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
      >
        {'Perform Migration'}
      </LoadingButton>
    </form>
  );
};

export { MigrationForm };
