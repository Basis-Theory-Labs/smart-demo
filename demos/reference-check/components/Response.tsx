import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from '@mui/material';

interface Props {
  data?: unknown;
  expanded?: boolean;
  onExpanded: (expanded: boolean) => unknown;
}

const Response = ({ data, expanded, onExpanded }: Props) => (
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
        <Typography component="pre" variant="code">
          {JSON.stringify(data, undefined, 2)}
        </Typography>
      </CardContent>
    </Collapse>
  </Card>
);

export { Response };
