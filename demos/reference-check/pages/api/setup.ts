import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(404).end();

    return;
  }

  if (req?.body?.privateApiKey) {
    global.privateApiKey = req?.body?.privateApiKey;
  }

  if (req?.body?.publicApiKey) {
    global.publicApiKey = req?.body?.publicApiKey;
  }

  res.status(200).end();
};

export default handler;
