import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ttl } from '@/components/utils';
import { ApiError } from '@/server/ApiError';
import { findDrivers, updateDrivers } from '@/server/db';
import { apiWithSession } from '@/server/session';

const migrateApi = apiWithSession(async (req, res, session) => {
  if (req.method !== 'POST') {
    throw new ApiError(404);
  }

  // finds all non tokenized drives
  const drivers = findDrivers(session.id, {
    tokenized: {
      $ne: true,
    },
  });

  if (drivers.length) {
    // initializes SDK with the API key
    const bt = await new BasisTheory().init(session.privateApiKey);

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
});

export default migrateApi;
