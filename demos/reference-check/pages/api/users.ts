// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { insertUser, findUsers } from "../../server/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = insertUser({
      ...req.body
    });
    res.status(201).json(user);
    return;
  }
  res.status(200).json(findUsers())

}
