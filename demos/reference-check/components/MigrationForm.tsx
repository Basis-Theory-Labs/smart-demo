import React, { FormEvent, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const MigrationForm = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = apiKey.length;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onMouseDown={() => setShowApiKey(true)}
                onMouseUp={() => setShowApiKey(false)}
              >
                {showApiKey ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        label="Server API Key"
        onChange={(e) => setApiKey(e.target.value)}
        required
        size="small"
        sx={{ mt: 2 }}
        type={showApiKey ? 'text' : 'password'}
        value={apiKey}
      />
      <LoadingButton
        disabled={!canSubmit}
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
