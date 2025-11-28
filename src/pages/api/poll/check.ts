import { NextApiRequest, NextApiResponse } from 'next';
import { getWorkshopById } from '../../../lib/database/polls';

const check = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const workshopId = parseInt(req.query.id as string, 10);
    
    if (!workshopId || isNaN(workshopId)) {
      return res.status(400).json({ status: 'error', message: 'Valid Workshop ID is required' });
    }

    const workshop = await getWorkshopById(workshopId);

    if (workshop) {
      return res.status(200).json({ status: 'success', data: workshop });
    }

    return res.status(404).json({ status: 'error', message: 'Workshop not found' });
  } catch (err) {
    console.error('Poll check error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export default check;
