import React, { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { MaskedTextField } from '@/components/MaskedTextField';
import type { Driver } from '@/types';

export const SearchForm = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post<Driver[]>('/api/search', {
        phoneNumber,
      });

      setDrivers(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        alignItems="center"
        component="form"
        display="flex"
        mt={3}
        onSubmit={submit}
      >
        <TextField
          InputProps={{
            inputComponent: MaskedTextField as never,
            inputProps: {
              mask: '(#00) 000-0000',
            },
          }}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
          size="small"
          sx={{
            flexGrow: 1,
          }}
          value={phoneNumber}
        />
        <LoadingButton
          color="primary"
          loading={loading}
          sx={{ ml: 1 }}
          type="submit"
          variant="contained"
        >
          {'Search'}
        </LoadingButton>
      </Box>

      {drivers && (
        <>
          <Typography sx={{ mt: 2 }} variant="subtitle1">
            {'Results'}
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{'Name'}</TableCell>
                  <TableCell>{'SSN'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!drivers.length && (
                  <TableRow>
                    <TableCell colSpan={2}>{'No records found'}</TableCell>
                  </TableRow>
                )}
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>
                        {driver.ssn || '-'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
