import React, { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import axios from 'axios';
import { MaskedTextField } from '@/components/MaskedTextField';

export const OriginalForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = name.length && phoneNumber.length === 14;

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/drivers', {
        name,
        phoneNumber,
      });
      setName('');
      setPhoneNumber('');
    } finally {
      setLoading(false);
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
      <TextField
        InputProps={{
          inputComponent: MaskedTextField as never,
          inputProps: {
            mask: '(#00) 000-0000',
          },
        }}
        fullWidth
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        required
        size="small"
        sx={{
          mt: 1,
        }}
        value={phoneNumber}
      />
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
