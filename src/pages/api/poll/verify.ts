import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

const verify = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const requestData = JSON.parse(req.body);
    const { rows, rowCount } = await sql`SELECT * FROM past_workshops WHERE Id = ${requestData.pollId}`;
    const result = rows.find(row => row.poll_access_code === requestData.accessPassword);

    if (rowCount === 0) {
      throw new Error('Invalid poll id');
    }

    if (result) {
      res.send({ status: 'success' });
    }

    throw new Error('Invalid Access code');
  } catch (err) {
    // res.send({ status: 'error', message: err.message });
  }
};

export default verify;

