import axios from 'axios';
import { createDriver } from '@/pages/api/drivers';
import { ApiError } from '@/server/ApiError';
import { apiWithSession } from '@/server/session';
import { randomHex } from '@/server/utils';

const REFERENCE_CHECK_AUTH_KEY = randomHex();
const REFERENCE_CHECK_API_ENDPOINT = 'https://echo.basistheory.com/anything';

const referenceCheckApi = apiWithSession(async (req, res, session) => {
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

  const { data } = await axios.request({
    url: 'https://api.basistheory.com/proxy',
    method: 'POST',
    headers: {
      'BT-API-KEY': session.privateApiKey,
      'BT-PROXY-URL': REFERENCE_CHECK_API_ENDPOINT,
      'RC-AUTH-KEY': REFERENCE_CHECK_AUTH_KEY,
      // 'BT-TRACE-ID': randomHex(),
    },
    data: {
      fullName: driver.name,
      phoneNumber: {
        full: `+1 {{${driver.phoneNumber}}}`,
        countryCode: '+1',
        areaCode: `{{ ${driver.phoneNumber} | split: ' ' | first | remove: '(' | remove: ')' }}`,
        exchangeCode: `{{ ${driver.phoneNumber}  | split: '-' | last }}`,
        lineNumber: `{{ ${driver.phoneNumber} | split: ' ' | last | split: '-' | first }}`,
      },
      socialSecurityNumber: `{{ ${driver.ssn} | remove: '-' }}`,
    },
  });

  res.status(201).json(data);
});

export default referenceCheckApi;
