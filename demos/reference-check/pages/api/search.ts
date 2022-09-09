import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ApiError } from '@/server/ApiError';
import { findDrivers } from '@/server/db';
import { logger } from '@/server/logger';
import { apiWithSession } from '@/server/session';

const searchApi = apiWithSession(async (req, res, session) => {
  if (req.method !== 'POST') {
    throw new ApiError(404);
  }

  const { phoneNumber } = req.body;

  // initializes SDK with the API key
  const bt = await new BasisTheory().init(session.privateApiKey);

  logger.info(`Searching tokens with matching data.`);

  // query sensitive data
  const {
    data: phoneNumberTokens,
    pagination: { totalItems },
  } = await bt.tokens.search({
    query: `data:"${phoneNumber}"`,
    page: 1,
  });

  logger.info(`${totalItems} records found.`);

  // finds drivers records matching the phone number token ids
  const dbDrivers = findDrivers(session.id, {
    phoneNumber: {
      $in: phoneNumberTokens.map((token) => token.id),
    },
  });

  // Lists masked SSNs for verification
  logger.info(`Listing masked SSNs.`);
  const { data: ssnTokens } = await bt.tokens.list({
    id: dbDrivers.filter((d) => d.ssn).map((d) => d.ssn as string),
  });

  const drivers = dbDrivers.map((driver) => ({
    ...driver,
    ssn: ssnTokens.find((token) => token.id === driver.ssn)?.data,
  }));

  res.status(200).json(drivers);
});

export default searchApi;
