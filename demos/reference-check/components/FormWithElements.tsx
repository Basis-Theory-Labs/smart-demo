import React, { FormEvent, useRef, useState } from 'react';
import { TextElement, useBasisTheory } from '@basis-theory/basis-theory-react';
import type { TextElement as ITextElement } from '@basis-theory/basis-theory-react/types';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { INTER_FONT, PHONE_NUMBER_MASK } from '@/components/constants';
import { ttl } from '@/components/utils';

interface Props {
  path?: string;
  onSubmit?: (data: unknown) => unknown;
}

export const FormWithElements = ({
  path = '/api/drivers',
  onSubmit,
}: Props) => {
  const [name, setName] = useState('');
  const [isPhoneNumberComplete, setPhoneNumberComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useAlias, setUseAlias] = useState(false);
  const { bt } = useBasisTheory();
  const theme = useTheme();
  const phoneNumberRef = useRef<ITextElement>(null);

  const canSubmit = bt && name.length && isPhoneNumberComplete;

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!canSubmit) {
      return;
    }

    if (bt) {
      setLoading(true);

      try {
        const token = await bt.tokens.create({
          ...(useAlias ? { id: '{{ data | alias_preserve_format }}' } : {}),
          type: 'token',
          data: phoneNumberRef.current,
          searchIndexes: ['{{ data }}'],
          expiresAt: ttl(),
        });

        const { data } = await axios.post(path, {
          name,
          phoneNumber: token.id,
          tokenized: true,
        });

        onSubmit?.(data);

        setName('');
        phoneNumberRef.current?.clear();
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
          ref={phoneNumberRef}
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
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={useAlias}
              onChange={(e) => setUseAlias(e.target.checked)}
            />
          }
          label="Use Aliasing"
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
