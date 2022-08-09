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

  if (req.method === 'GET') {
    res.status(200).json(findDrivers());

    return;
  }

  res.status(404).end();
};

export default handler;
