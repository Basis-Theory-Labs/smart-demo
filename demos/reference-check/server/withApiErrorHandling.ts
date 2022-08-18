import { NextApiHandler } from 'next';
import { ApiError } from '@/server/ApiError';

export const withApiErrorHandling =
  (apiHandler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      await apiHandler(req, res);
    } catch (error) {
      if (error instanceof ApiError && res.writable) {
        res.status(error.statusCode).json({
          message: error.message,
        });

        return;
      }
    }
  };
