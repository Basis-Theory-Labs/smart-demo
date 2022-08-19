import { serialize, CookieSerializeOptions } from 'cookie';
import crypto from 'crypto';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextApiRequest,
} from 'next';
import { NextApiHandler } from 'next';
import { NextApiResponse } from 'next/dist/shared/lib/utils';
import { GetServerSidePropsContext } from 'next/types';
import { destroyCookie } from 'nookies';
import { ApiError } from '@/server/ApiError';
import {
  removeDrivers,
  findSession,
  removeSession,
  insertSession,
  seedDrivers,
} from '@/server/db';
import { Session } from '@/types';

const SESSION_COOKIE_NAME = 'DriveWellSession';

const getSession = (req: {
  cookies: Partial<Record<string, string>>;
}):
  | { valid: false; session?: never }
  | { valid: false; session: string }
  | { valid: true; session: Session } => {
  const id = req.cookies[SESSION_COOKIE_NAME];

  if (id) {
    const session = findSession(id);

    if (session) {
      return {
        session,
        valid: true,
      };
    }

    return {
      session: id,
      valid: false,
    };
  }

  return {
    valid: false,
  };
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  if (typeof options.maxAge === 'number') {
    // eslint-disable-next-line no-param-reassign
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

const createSession = (res: NextApiResponse, keys: Omit<Session, 'id'>) => {
  const session = crypto.randomBytes(20).toString('hex');

  insertSession({
    id: session,
    ...keys,
  });
  seedDrivers(session);

  setCookie(res, SESSION_COOKIE_NAME, session, {
    maxAge: 60 * 60, // 1 hour session
    secure: true,
    path: '/',
    sameSite: 'lax',
  });

  return session;
};

type GetServerSidePropsWithSession<R = Record<string, any>> = (
  context: GetServerSidePropsContext,
  session: Session
) => Promise<GetServerSidePropsResult<R>>;

const getServerSidePropsWithSession =
  (handler?: GetServerSidePropsWithSession): GetServerSideProps =>
  (context) => {
    const { session, valid } = getSession(context.req);

    if (!valid) {
      return Promise.resolve({
        redirect: {
          permanent: false,
          destination: '/',
        },
      });
    }

    if (typeof handler !== 'function') {
      return Promise.resolve({ props: {} });
    }

    return handler(context, session);
  };

type ApiHandlerWithSession = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => unknown | Promise<unknown>;

const destroySession = (session: string, res: NextApiResponse) => {
  destroyCookie(
    {
      res,
    },
    SESSION_COOKIE_NAME
  );
  removeSession(session);
  removeDrivers(session);
};

const replaceSession = (req: NextApiRequest, res: NextApiResponse) => {
  const { session, valid } = getSession(req);

  if (valid) {
    removeSession(session.id);
    removeDrivers(session.id);
  }

  return createSession(res, req.body);
};

const apiWithSession =
  (apiHandler: ApiHandlerWithSession): NextApiHandler =>
  async (req, res) => {
    const { session, valid } = getSession(req);

    if (!valid) {
      if (session) {
        destroySession(session, res);
      }

      res.status(401).end();

      return;
    }

    try {
      await apiHandler(req, res, session);
    } catch (error) {
      if (error instanceof ApiError && res.writable) {
        res.status(error.statusCode).json({
          message: error.message,
        });

        return;
      }
    }
  };

export {
  getSession,
  replaceSession,
  apiWithSession,
  getServerSidePropsWithSession,
};
