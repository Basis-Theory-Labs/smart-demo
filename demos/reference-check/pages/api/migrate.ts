import { BasisTheory } from '@basis-theory/basis-theory-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ttl } from '@/components/utils';
import { findDrivers, updateDrivers } from '@/server/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(404).end();

    return;
  }

  // finds all non tokenized drives
  const drivers = findDrivers({
    tokenized: {
      $ne: true,
    },
  });

  if (drivers.length) {
    // initializes SDK with the API key
    const { apiKey } = req.body;
    const bt = await new BasisTheory().init(apiKey);

    // tokenizes bulk array
    const tokens = await bt.tokenize(
      drivers.map((driver) => ({
        type: 'token',
        id: '{{ data | alias_preserve_format }}',
        data: driver.phoneNumber,
        expiresAt: ttl(),
      }))
    );

    // updates database
    updateDrivers(
      drivers.map((driver, index) => ({
        ...driver,
        phoneNumber: tokens[index].id,
        tokenized: true,
      }))
    );
  }

  res.status(200).end();
};

export default handler;
