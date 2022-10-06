import React, { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prismTheme } from '@/components/prismTheme';
import type { EchoResponse } from '@/types';

interface Props {
  data?: EchoResponse;
  expanded?: boolean;
  onExpanded: (expanded: boolean) => unknown;
}

const specialHeaders = new Set(['BT-TRACE-ID', 'RC-AUTH-KEY']);

const Response = ({ data, expanded, onExpanded }: Props) => {
  const [tab, setTab] = useState('payload');

  return (
    <Card sx={{ mb: 2 }}>
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
        {data && (
          <CardContent>
            <Card
              sx={{
                p: 2,
                mb: 2,
              }}
            >
              {data.method && (
                <Chip
                  label={data.method}
                  sx={(theme) => ({
                    borderRadius: theme.shape.borderRadius,
                    background: 'rgba(0, 210, 239, 0.15)',
                    border: '1px solid rgba(0, 210, 239, 0.15)',
                    color: '#00B3CC',
                    fontWeight: 600,
                  })}
                />
              )}
              {data.url && (
                <Typography
                  component="span"
                  fontSize={14}
                  sx={{ ml: 2 }}
                  variant="code"
                >
                  {data.url}
                </Typography>
              )}
            </Card>
            <TabContext value={tab}>
              <TabList onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
                <Tab label="Headers" value="headers" />
                <Tab label="Payload" value="payload" />
              </TabList>
              <TabPanel value="headers">
                {data.headers && (
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableBody>
                        {Object.entries(data.headers).map(([header, value]) => {
                          const isSpecial = specialHeaders.has(
                            header.toUpperCase()
                          );

                          return (
                            <TableRow hover key={header}>
                              <TableCell>
                                <Typography
                                  color={
                                    isSpecial ? 'warning.main' : 'text.primary'
                                  }
                                  fontWeight={500}
                                  lineHeight="1"
                                  variant="overline"
                                >
                                  {header}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  color={
                                    isSpecial
                                      ? 'warning.main'
                                      : 'text.secondary'
                                  }
                                  sx={{
                                    wordBreak: 'break-all',
                                  }}
                                  variant="code"
                                >
                                  {value as string}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </TabPanel>
              <TabPanel value="payload">
                {Boolean(data.json) && (
                  <SyntaxHighlighter
                    customStyle={{ minHeight: '100%' }}
                    language="json"
                    showLineNumbers
                    style={prismTheme}
                  >
                    {JSON.stringify(data.json, undefined, 2)}
                  </SyntaxHighlighter>
                )}
              </TabPanel>
            </TabContext>
          </CardContent>
        )}
      </Collapse>
    </Card>
  );
};

export { Response };
