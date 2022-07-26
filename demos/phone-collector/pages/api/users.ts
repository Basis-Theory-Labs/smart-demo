// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { users } from "../../server/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = users.insert({
      ...req.body
    });
    res.status(201).json(user);
    return;
  }
  res.status(200).json(users.find())

}
