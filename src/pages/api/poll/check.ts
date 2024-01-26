import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

const check = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const { rows } = await sql`SELECT * FROM past_workshops WHERE Id = ${req.query.id as string}`;

    console.log(rows);
  } catch (err) {

  }
};

export default check;
