import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

const check = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM past_workshops WHERE Id = ${req.query.id as string}`;

    if (rowCount > 0) {
      
      res.send({ status: 'success', data: rows[0] });
    }
  } catch (err) {

  }
};

export default check;
