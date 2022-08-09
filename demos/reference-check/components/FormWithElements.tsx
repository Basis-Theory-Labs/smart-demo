import React, { FormEvent, useState } from 'react';
import { TextElement, useBasisTheory } from '@basis-theory/basis-theory-react';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, useTheme } from '@mui/material';
import { INTER_FONT, PHONE_NUMBER_MASK } from '@/components/constants';
import { ttl } from '@/components/utils';

export const FormWithElements = () => {
  const [name, setName] = useState('');
  const [isPhoneNumberComplete, setPhoneNumberComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { bt } = useBasisTheory();
  const theme = useTheme();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const phoneNumber = bt?.getElement('phoneNumber');
      const token = await bt?.tokens.create({
        // id: '{{ data | alias_preserve_format }}',
        type: 'token',
        data: phoneNumber,
        expiresAt: ttl(),
      });

      await fetch('/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber: token.id,
          tokenized: true,
        }),
      });
      setName('');
      phoneNumber?.clear();
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = name.length && isPhoneNumberComplete;

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
    </form>
  );
};
