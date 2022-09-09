import type { NextApiHandler } from 'next';
import { ApiError } from '@/server/ApiError';
import { logger } from '@/server/logger';
import { replaceSession } from '@/server/session';

const setupApi: NextApiHandler = (req, res) => {
  if (req.method !== 'POST') {
    throw new ApiError(404);
  }

  if (!req.body?.publicApiKey || !req.body?.privateApiKey) {
    throw new ApiError(400);
  }

  replaceSession(req, res);
  logger.info('Created a new session for provided keys.');

  res.status(200).end();
};

export default setupApi;
