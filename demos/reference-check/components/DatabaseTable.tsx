import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useSWR from 'swr';
import type { Driver } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TableHeadPaper = ({ ...props }) => (
  <Paper
    component="thead"
    elevation={2}
    sx={{
      border: 'none',
      th: {
        color: 'text.secondary',
      },
    }}
    {...props}
  />
);

export const DatabaseTable = () => {
  const { data } = useSWR<Driver[]>('/api/drivers', fetcher, {
    refreshInterval: 100,
  });

  return (
    <Card>
      <CardHeader title="Database" />
      <CardContent>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead component={TableHeadPaper}>
              <TableRow>
                <TableCell>{'ID'}</TableCell>
                <TableCell>{'Name'}</TableCell>
                <TableCell>{'Phone Number'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map?.((driver) => (
                <TableRow
                  key={driver.id}
                  sx={{ td: { color: 'text.secondary' } }}
                >
                  <TableCell>
                    <Typography variant="code">{driver.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="code">{driver.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={driver?.tokenized ? 'warning.main' : 'inherit'}
                      variant="code"
                    >
                      {driver.phoneNumber}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
