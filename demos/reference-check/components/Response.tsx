import React, { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

interface Props {
  data?: any;
  expanded?: boolean;
  onExpanded: (expanded: boolean) => unknown;
}

const Response = ({ data, expanded, onExpanded }: Props) => {
  const [tab, setTab] = useState('payload');

  return (
    <Card>
      <CardHeader
        action={
          <ExpandMore
            sx={(theme) => ({
              transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
              marginLeft: 'auto',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
            })}
          />
        }
        onClick={() => onExpanded(!expanded)}
        sx={{
          cursor: 'pointer',
        }}
        title="Response"
      />
      <Collapse in={expanded}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            {data?.method && <Chip label={data?.method} />}
            {data?.url && (
              <Typography sx={{ ml: 2 }} variant="code">
                {data.url}
              </Typography>
            )}
          </Box>
          <TabContext value={tab}>
            <TabList onChange={(_, value) => setTab(value)}>
              <Tab label="Headers" value="headers" />
              <Tab label="Payload" value="payload" />
            </TabList>
            <TabPanel value="headers">
              {data?.headers && (
                <Table size="small">
                  <TableBody>
                    {Object.entries(data.headers).map(([header, value]) => (
                      <TableRow hover key={header}>
                        <TableCell>
                          <Typography lineHeight="1" variant="overline">
                            {header}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.secondary" variant="code">
                            {value as string}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabPanel>
            <TabPanel value="payload">
              {data?.json && (
                <Typography
                  component="pre"
                  sx={{
                    backgroundColor: 'grey.900',
                  }}
                  variant="code"
                >
                  {JSON.stringify(data?.json, undefined, 2)}
                </Typography>
              )}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { Response };
