import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ApiError } from '@/server/ApiError';
import { findDrivers, insertDriver } from '@/server/db';
import { apiWithSession } from '@/server/session';
import { Driver, Session } from '@/types';

/**
 * Verifies if the ssn is already
 * present in the database
 */
const isDuplicated = (tenant: string, ssn?: string): boolean =>
  Boolean(
    ssn &&
      findDrivers(tenant, {
        ssn: {
          $eq: ssn,
        },
      }).length
  );

/**
 * Deletes tokens that won't be used
 */
const cleanUpTokens = async (session: Session, ...ids: string[]) => {
  const bt = await new BasisTheory().init(session.privateApiKey);

  await Promise.all(ids.map((id) => bt.tokens.delete(id)));
};

const createDriver = async (
  session: Session,
  { name, phoneNumber, tokenized, ssn, ssnFingerprint }: Omit<Driver, 'tenant'>
) => {
  if (tokenized && ssn && isDuplicated(session.id, ssn)) {
    await cleanUpTokens(session, phoneNumber);

    throw new ApiError(409, `Duplicate SSN. Fingerprint: ${ssnFingerprint}`);
  }

  return insertDriver(session.id, {
    name,
    phoneNumber,
    ssn,
    ssnFingerprint,
    tokenized,
  });
};

const driversApi = apiWithSession(async (req, res, session) => {
  if (req.method === 'GET') {
    res.status(200).json(findDrivers(session.id));

    return;
  }

  if (req.method !== 'POST') {
    throw new ApiError(404);
  }

  const { name, phoneNumber, tokenized, ssn, ssnFingerprint } = req.body;

  const driver = await createDriver(session, {
    name,
    phoneNumber,
    tokenized,
    ssn,
    ssnFingerprint,
  });

  res.status(201).json(driver);

  return;
});

export default driversApi;
export { createDriver };
