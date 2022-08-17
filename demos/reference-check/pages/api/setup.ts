import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/server/ApiError';
import { withApiErrorHandling } from '@/server/withApiErrorHandling';

const setupApi = withApiErrorHandling(
  (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      throw new ApiError(404);
    }

    if (req?.body?.privateApiKey) {
      global.privateApiKey = req?.body?.privateApiKey;
    }

    if (req?.body?.publicApiKey) {
      global.publicApiKey = req?.body?.publicApiKey;
    }

    res.status(200).end();
  }
);

export default setupApi;
