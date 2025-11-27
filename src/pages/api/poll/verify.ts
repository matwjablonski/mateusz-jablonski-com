import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

const verify = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const requestData = JSON.parse(req.body);
    const { rows, rowCount } = await sql`SELECT * FROM past_workshops WHERE Id = ${requestData.pollId}`;
    const result = rows.find(row => row.poll_access_code === requestData.accessPassword);

    if (rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Invalid poll id' });
    }

    if (result) {
      return res.status(200).json({ status: 'success' });
    }

    return res.status(401).json({ status: 'error', message: 'Invalid Access code' });
  } catch (err) {
    console.error('Poll verify error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default verify;

