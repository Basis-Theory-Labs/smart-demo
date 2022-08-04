// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { findDrivers, insertDriver } from '@/server/db';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const user = insertDriver({
      ...req.body,
    });

    res.status(201).json(user);

    return;
  }

  res.status(200).json(findDrivers());
};

export default handler;
