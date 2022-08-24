import React, { FormEvent, useState } from 'react';
import { TextElement, useBasisTheory } from '@basis-theory/basis-theory-react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Snackbar, TextField, useTheme } from '@mui/material';
import axios, { AxiosError } from 'axios';
import {
  INTER_FONT,
  PHONE_NUMBER_MASK,
  SSN_MASK,
} from '@/components/constants';
import { ttl } from '@/components/utils';

interface Props {
  path?: string;
  onSubmit?: (data: unknown) => unknown;
}

export const FormWithFingerprint = ({
  path = '/api/drivers',
  onSubmit,
}: Props) => {
  const [name, setName] = useState('');
  const [isPhoneNumberComplete, setPhoneNumberComplete] = useState(false);
  const [isSsnComplete, setSsnComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { bt } = useBasisTheory();
  const theme = useTheme();
  const canSubmit = bt && name.length && isPhoneNumberComplete && isSsnComplete;

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!canSubmit) {
      return;
    }

    if (bt) {
      setLoading(true);

      try {
        const phoneNumber = bt.getElement('phoneNumber');
        const ssn = bt.getElement('ssn');

        const tokens = await bt.tokenize({
          phoneNumber: {
            id: '{{ data | alias_preserve_format }}',
            type: 'token',
            data: phoneNumber,
            expires_at: ttl(),
          },
          ssn: {
            id: '{{ data | alias_preserve_format }}',
            type: 'social_security_number',
            data: ssn,
            expires_at: ttl(),
            deduplicate_token: true,
          },
        });

        const { data } = await axios.post(path, {
          name,
          phoneNumber: tokens.phoneNumber.id,
          ssn: tokens.ssn.id,
          ssnFingerprint: tokens.ssn.fingerprint,
          tokenized: true,
        });

        onSubmit?.(data);

        setName('');
        phoneNumber.clear();
        ssn.clear();
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <TextField
        fullWidth
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        size="small"
        sx={{ mt: 2 }}
        value={name}
      />
      <Box
        sx={{
          mt: 1,
          py: 1.06,
          px: 1.75,
          borderRadius: 1,
          border: `1px solid rgba(0,0,0,0.25)`,
        }}
      >
        <TextElement
          id="phoneNumber"
          mask={PHONE_NUMBER_MASK}
          onChange={(e) => setPhoneNumberComplete(e.complete)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
          placeholder="Phone Number"
          style={{
            fonts: [INTER_FONT],
            base: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              padding: 0,
              '::placeholder': {
                color: theme.palette.text.disabled,
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 1,
          py: 1.06,
          px: 1.75,
          borderRadius: 1,
          border: `1px solid rgba(0,0,0,0.25)`,
        }}
      >
        <TextElement
          id="ssn"
          mask={SSN_MASK}
          onChange={(e) => setSsnComplete(e.complete)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
          placeholder="SSN"
          style={{
            fonts: [INTER_FONT],
            base: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              padding: 0,
              '::placeholder': {
                color: theme.palette.text.disabled,
              },
            },
          }}
        />
      </Box>
      <LoadingButton
        color="primary"
        disabled={!canSubmit}
        loading={loading}
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
      >
        {'Submit'}
      </LoadingButton>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={10000}
        onClose={() => setErrorMessage('')}
        open={Boolean(errorMessage)}
      >
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
