import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ttl } from '@/components/utils';
import { ApiError } from '@/server/ApiError';
import { findDrivers, updateDrivers } from '@/server/db';
import { logger } from '@/server/logger';
import { apiWithSession } from '@/server/session';

const migrateApi = apiWithSession(async (req, res, session) => {
  if (req.method !== 'POST') {
    throw new ApiError(404);
  }

  logger.info(`Finding all drivers with plain-text data.`);
  const drivers = findDrivers(session.id, {
    tokenized: {
      $ne: true,
    },
  });

  if (drivers.length) {
    logger.info(`${drivers.length} records found.`);

    // initializes SDK with the API key
    const bt = await new BasisTheory().init(session.privateApiKey);

    logger.info(`Tokenizing bulk records.`);
    const tokens = await bt.tokenize(
      drivers.map((driver) => ({
        type: 'token',
        id: '{{ data | alias_preserve_format }}',
        data: driver.phoneNumber,
        expires_at: ttl(),
        search_indexes: ['{{ data }}'],
      }))
    );

    logger.info(`Updating plaintext with token IDs.`);
    updateDrivers(
      drivers.map((driver, index) => ({
        ...driver,
        phoneNumber: (tokens as any)[index].id,
        tokenized: true,
      }))
    );
  } else {
    logger.info(`No records found.`);
  }

  res.status(200).end();
});

export default migrateApi;
