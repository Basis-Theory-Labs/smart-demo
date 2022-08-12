import React, { FormEvent, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  value: string;
  onChange: (value: string) => unknown;
  label?: string;
}

const PasswordField = ({ value, onChange, label }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onMouseDown={() => setVisible(true)}
              onMouseUp={() => setVisible(false)}
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      label={label}
      onChange={(e) => onChange(e.target.value)}
      required
      size="small"
      sx={{ mt: 2 }}
      type={visible ? 'text' : 'password'}
      value={value}
    />
  );
};

const SetupForm = ({ done }: { done?: boolean }) => {
  const [publicApiKey, setPublicApiKey] = useState('');
  const [privateApiKey, setPrivateApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const canSubmit = publicApiKey.length && privateApiKey.length;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/setup', {
        publicApiKey,
        privateApiKey,
      });
      await router.push('/original-form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <PasswordField
        label="Public API Key"
        onChange={setPublicApiKey}
        value={publicApiKey}
      />
      <PasswordField
        label="Private API Key"
        onChange={setPrivateApiKey}
        value={privateApiKey}
      />
      <LoadingButton
        disabled={!canSubmit}
        loading={loading}
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
      >
        {'Get Started'}
      </LoadingButton>
      {done && (
        <Button
          onClick={() => router.push('/original-form')}
          sx={{ mt: 2 }}
          type="button"
          variant="text"
        >
          {'Skip'}
        </Button>
      )}
    </form>
  );
};

export { SetupForm };
