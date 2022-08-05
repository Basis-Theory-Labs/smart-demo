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
} from '@mui/material';
import useSWR from 'swr';
import type { Driver } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TableHeadPaper = ({ ...props }) => (
  <Paper component="thead" elevation={2} {...props} />
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
              {data?.map?.((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
