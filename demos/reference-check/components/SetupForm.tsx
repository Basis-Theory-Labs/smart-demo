import React, { FormEvent, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import type { StandardTextFieldProps } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props extends Omit<StandardTextFieldProps, 'onChange'> {
  onChange: (value: string) => unknown;
}

const PasswordField = ({ value, onChange, label, ...props }: Props) => {
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
      {...props}
    />
  );
};

const SetupForm = ({ hasSession }: { hasSession?: boolean }) => {
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
      await router.push('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <PasswordField
        helperText={
          <>
            {'Click '}
            <Link
              href="https://portal.basistheory.com/applications/create?name=Reference+Check+Frontend&permissions=token%3Ageneral%3Acreate&permissions=token%3Apii%3Acreate&type=public"
              target="_blank"
            >
              {'here'}
            </Link>
            {' to create an Application with the required permissions'}
          </>
        }
        label="Public API Key"
        name="publicApiKey"
        onChange={setPublicApiKey}
        value={publicApiKey}
      />
      <PasswordField
        helperText={
          <>
            {'Click '}
            <Link
              href="https://portal.basistheory.com/applications/create?name=Reference+Check+Backend&permissions=token%3Ageneral%3Acreate&permissions=token%3Ageneral%3Ause%3Aproxy&permissions=token%3Ageneral%3Adelete&permissions=token%3Apii%3Adelete&permissions=token%3Apii%3Ause%3Aproxy"
              target="_blank"
            >
              {'here'}
            </Link>
            {' to create an Application with the required permissions'}
          </>
        }
        label="Private API Key"
        name="privateApiKey"
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
      {hasSession && (
        <Alert
          action={
            <Button
              onClick={() => router.push('/home')}
              type="button"
              variant="text"
            >
              {'Skip'}
            </Button>
          }
          severity="warning"
          sx={{
            mt: 2,
          }}
        >
          {
            'By submitting this again, your previous session database will be reset.'
          }
        </Alert>
      )}
    </form>
  );
};

export { SetupForm };
