import { BasisTheory } from '@basis-theory/basis-theory-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/server/ApiError';
import { findDrivers, insertDriver } from '@/server/db';
import { withApiErrorHandling } from '@/server/withApiErrorHandling';
import { Driver } from '@/types';

/**
 * Verifies if the SSN fingerprint is already
 * present in the database
 * @param ssnFingerprint
 */
const isDuplicated = (ssnFingerprint?: string): boolean =>
  Boolean(
    ssnFingerprint &&
      findDrivers({
        ssnFingerprint: {
          $eq: ssnFingerprint,
        },
      }).length
  );

/**
 * Deletes tokens that won't be used in the workflow
 * @param phoneNumber
 * @param ssn
 */
const cleanUpTokens = async (phoneNumber: string, ssn: string) => {
  const bt = await new BasisTheory().init(global.privateApiKey);

  await Promise.all([bt.tokens.delete(ssn), bt.tokens.delete(phoneNumber)]);
};

const createDriver = async ({
  name,
  phoneNumber,
  tokenized,
  ssn,
  ssnFingerprint,
}: Driver) => {
  if (tokenized && ssn && isDuplicated(ssnFingerprint)) {
    await cleanUpTokens(phoneNumber, ssn);

    throw new ApiError(409, `Duplicate SSN: ${ssnFingerprint}`);
  }

  return insertDriver({
    name,
    phoneNumber,
    ssn,
    ssnFingerprint,
    tokenized,
  });
};

const driversApi = withApiErrorHandling(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      res.status(200).json(findDrivers());

      return;
    }

    if (req.method !== 'POST') {
      throw new ApiError(404);
    }

    const driver = await createDriver(req.body);

    res.status(201).json(driver);

    return;
  }
);

export default driversApi;
export { createDriver };
