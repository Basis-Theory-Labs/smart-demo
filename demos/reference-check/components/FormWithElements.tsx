import React, { FormEvent, useState } from 'react';
import { TextElement, useBasisTheory } from '@basis-theory/basis-theory-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';

export const FormWithElements = () => {
  const [name, setName] = useState('');
  const { bt } = useBasisTheory();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const phoneNumber = bt?.getElement('phoneNumber');
    const token = await bt?.tokens.create({
      // id: '{{ data | alias_preserve_format }}',
      type: 'token',
      data: phoneNumber,
    });

    await fetch('/api/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phoneNumber: token.id,
      }),
    });
    setName('');
    phoneNumber?.clear();
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
              placeholder="Phone Number"
              style={{
                fonts: [
                  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
                ],
                base: {
                  fontFamily: "'Roboto'",
                  padding: 0,
                  '::placeholder': {
                    color: 'rgba(0, 0, 0, 0.35)',
                  },
                },
              }}
            />
          </Box>
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
