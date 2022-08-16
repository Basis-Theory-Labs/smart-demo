import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { insertDriver } from '@/server/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(404).end();

    return;
  }

  const { name, phoneNumber } = insertDriver({
    ...req.body,
  });

  const proxyRes = await axios.request({
    url: 'https://api.basistheory.com/proxy',
    method: 'POST',
    headers: {
      'BT-API-KEY': global.privateApiKey,
      'BT-PROXY-URL': 'https://httpbin.org/anything',
    },
    data: {
      name,
      phoneNumber: `{{${phoneNumber}}}`,
    },
  });

  res.status(201).json(proxyRes.data);

  return;
};

export default handler;
