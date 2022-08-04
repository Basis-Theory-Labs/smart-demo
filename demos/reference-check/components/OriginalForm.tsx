import React, { FormEvent, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';

export const OriginalForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await fetch('/api/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phoneNumber,
      }),
    });
    setName('');
    setPhoneNumber('');
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Your Application" />
      <CardContent>
        <form onSubmit={submit}>
          <TextField
            fullWidth
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            size="small"
            value={name}
          />
          <TextField
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
          <Button
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
          >
            {'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
