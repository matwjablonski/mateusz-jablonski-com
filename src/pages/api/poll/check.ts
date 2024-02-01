import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

const check = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM past_workshops WHERE Id = ${req.query.id as string}`;

    if (rowCount > 0) {
      res.send({ status: 'success', data: {
        date: rows[0].date,
        name: rows[0].name,
        id: rows[0].id,
      } });
    }
  } catch (err) {

  }
};

export default check;
