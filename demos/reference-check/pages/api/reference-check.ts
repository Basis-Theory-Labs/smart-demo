import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createDriver } from '@/pages/api/drivers';
import { ApiError } from '@/server/ApiError';
import { withApiErrorHandling } from '@/server/withApiErrorHandling';

const referenceCheckApi = withApiErrorHandling(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      throw new ApiError(404);
    }

    const { name, phoneNumber, ssn } = await createDriver(req.body);

    const proxyRes = await axios.request({
      url: 'https://api.basistheory.com/proxy',
      method: 'POST',
      headers: {
        'BT-API-KEY': global.privateApiKey,
        'BT-PROXY-URL': 'https://echo.basistheory.com/anything',
      },
      data: {
        name,
        phoneNumber: {
          full: `+1 {{${phoneNumber}}}`,
          countryCode: '+1',
          areaCode: `{{ ${phoneNumber} | split: ' ' | first | remove: '(' | remove: ')' }}`,
          exchangeCode: `{{ ${phoneNumber}  | split: '-' | last }}`,
          lineNumber: `{{ ${phoneNumber} | split: ' ' | last | split: '-' | first }}`,
        },
        ssn: `{{ ${ssn} | remove: '-' }}`,
      },
    });

    res.status(201).json(proxyRes.data);

    return;
  }
);

export default referenceCheckApi;
