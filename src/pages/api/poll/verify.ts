import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPollAccess } from '../../../lib/database/polls';

const verify = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const requestData = JSON.parse(req.body);
    const { pollId, accessPassword } = requestData;
    const pollIdNum = parseInt(pollId, 10);

    if (!pollIdNum || isNaN(pollIdNum) || !accessPassword) {
      return res.status(400).json({ status: 'error', message: 'Valid Poll ID and access code are required' });
    }

    const isValid = await verifyPollAccess(pollIdNum, accessPassword);

    if (isValid) {
      return res.status(200).json({ status: 'success' });
    }

    return res.status(401).json({ status: 'error', message: 'Invalid Access code' });
  } catch (err) {
    console.error('Poll verify error:', err);
    
    if (err.message === 'Poll not found') {
      return res.status(404).json({ status: 'error', message: 'Invalid poll id' });
    }
    
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export default verify;

