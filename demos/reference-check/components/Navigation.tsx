import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

interface Route {
  route: string;
  title: string;
}

const routes: Route[] = [
  {
    route: '/',
    title: 'Original Form',
  },
  {
    route: '/with-elements',
    title: 'With Basis Theory',
  },
];

interface CurrentRoutes {
  previous?: Route;
  current?: Route;
  next?: Route;
}

const useRoutes = (): CurrentRoutes => {
  const router = useRouter();

  const index = routes.findIndex((i) => i.route === router.route);

  return {
    previous: routes[index - 1],
    current: routes[index],
    next: routes[index + 1],
  };
};

const Navigation = () => {
  const { previous, current, next } = useRoutes();

  return (
    <AppBar component="nav" elevation={1} position="static">
      <Toolbar>
        <NextLink href={previous?.route ?? '/'} passHref>
          <Button
            startIcon={<ArrowLeftIcon />}
            sx={{ visibility: previous ? 'inherit' : 'hidden' }}
          >
            {'Previous'}
          </Button>
        </NextLink>
        <Typography
          align="center"
          color="text.secondary"
          sx={{ flexGrow: 1 }}
          variant="subtitle2"
        >
          {current?.title}
        </Typography>
        <NextLink href={next?.route ?? '/'} passHref>
          <Button
            endIcon={<ArrowRightIcon />}
            sx={{ visibility: next ? 'inherit' : 'hidden' }}
          >
            {'Next'}
          </Button>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

export { Navigation };
