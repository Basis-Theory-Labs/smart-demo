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
import type { Checkout } from '@/types';
import { TableHeadPaper } from './TableHeadPaper';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const DatabaseTable = () => {
  const { data } = useSWR<Checkout[]>('/api/checkouts', fetcher, {
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
                <TableCell>{'Home Policy'}</TableCell>
                <TableCell>{'Auto Policy'}</TableCell>
                <TableCell>{'Payment'}</TableCell>
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
                    <Typography variant="code">
                      {driver.homePolicyType}
                      <br />
                      {'$ '}
                      {driver.homePolicyValue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="code">
                      {driver.autoPolicyType}
                      <br />
                      {'$ '}
                      {driver.autoPolicyValue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={driver?.tokenized ? 'warning.main' : 'inherit'}
                      sx={{ wordBreak: 'break-all' }}
                      variant="code"
                    >
                      {driver.paymentToken}
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
