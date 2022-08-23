import axios from 'axios';
import { createDriver } from '@/pages/api/drivers';
import { ApiError } from '@/server/ApiError';
import { apiWithSession } from '@/server/session';

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

  const proxyRes = await axios.request({
    url: 'https://api.basistheory.com/proxy',
    method: 'POST',
    headers: {
      'BT-API-KEY': session.privateApiKey,
      'BT-PROXY-URL': 'https://echo.basistheory.com/anything',
      'DRIVE-WELL-AUTH': session.id,
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

  res.status(201).json(proxyRes.data);

  return;
});

export default referenceCheckApi;
