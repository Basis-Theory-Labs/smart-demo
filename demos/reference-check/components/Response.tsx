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

interface Props {
  data?: any;
  expanded?: boolean;
  onExpanded: (expanded: boolean) => unknown;
}

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
              {data?.method && <Chip color="primary" label={data?.method} />}
              {data?.url && (
                <Typography component="span" sx={{ ml: 2 }} variant="subtitle2">
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
                {data?.headers && (
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableBody>
                        {Object.entries(data.headers).map(([header, value]) => (
                          <TableRow hover key={header}>
                            <TableCell>
                              <Typography
                                fontWeight={500}
                                lineHeight="1"
                                variant="overline"
                              >
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
                  </TableContainer>
                )}
              </TabPanel>
              <TabPanel value="payload">
                {data?.json && (
                  <SyntaxHighlighter
                    customStyle={{ minHeight: '100%' }}
                    language="json"
                    showLineNumbers
                    style={prismTheme}
                  >
                    {JSON.stringify(data?.json, undefined, 2)}
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
