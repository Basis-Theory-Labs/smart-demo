import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ttl } from '@/components/utils';
import { ApiError } from '@/server/ApiError';
import { findCheckouts, updateCheckouts } from '@/server/db';
import { apiWithSession } from '@/server/session';

const migrateApi = apiWithSession(async (req, res, session) => {
  if (req.method !== 'POST') {
    throw new ApiError(404);
  }

  // const checkouts = findCheckouts(session.id, {
  //   tokenized: {
  //     $ne: true,
  //   },
  // });
  //
  // if (checkouts.length) {
  //   // initializes SDK with the API key
  //   const bt = await new BasisTheory().init(session.privateApiKey);
  //
  //   const tokens = await bt.tokenize(
  //     checkouts.map((driver) => ({
  //       type: 'token',
  //       data: driver.paymentToken,
  //       expires_at: ttl(),
  //       search_indexes: ['{{ data }}'],
  //     }))
  //   );
  //
  //   updateDrivers(
  //     checkouts.map((driver, index) => ({
  //       ...driver,
  //       phoneNumber: (tokens as any)[index].id,
  //       tokenized: true,
  //     }))
  //   );
  // }

  res.status(200).end();
});

export default migrateApi;
