import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ApiError } from '@/server/ApiError';
import { findDrivers, insertDriver } from '@/server/db';
import { apiWithSession } from '@/server/session';
import { Driver, Session } from '@/types';

/**
 * Verifies if the SSN fingerprint is already
 * present in the database
 */
const isDuplicated = (tenant: string, ssnFingerprint?: string): boolean =>
  Boolean(
    ssnFingerprint &&
      findDrivers(tenant, {
        ssnFingerprint: {
          $eq: ssnFingerprint,
        },
      }).length
  );

/**
 * Deletes tokens that won't be used
 */
const cleanUpTokens = async (
  session: Session,
  phoneNumber: string,
  ssn: string
) => {
  const bt = await new BasisTheory().init(session.privateApiKey);

  await Promise.all([bt.tokens.delete(ssn), bt.tokens.delete(phoneNumber)]);
};

const createDriver = async (
  session: Session,
  { name, phoneNumber, tokenized, ssn, ssnFingerprint }: Omit<Driver, 'tenant'>
) => {
  if (tokenized && ssn && isDuplicated(session.id, ssnFingerprint)) {
    await cleanUpTokens(session, phoneNumber, ssn);

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
