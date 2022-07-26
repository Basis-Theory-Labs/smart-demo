// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { dbAdapter } from "../../server/db";
import NextCrud from "@premieroctet/next-crud";

const handler = NextCrud({
  adapter: dbAdapter
})

export default handler;