import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import axios from 'axios';

const lastFmApiKey = env.LAST_FM_API_KEY;

const getLastTrack = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
    const user = 'matwjablonski';

    const response = await axios.get(`${url}&user=${user}&api_key=${lastFmApiKey}&format=json`);

    const data = await response.data;

    const dataToReturn = {
      name: data.recenttracks.track[0].name,
      artist: data.recenttracks.track[0].artist['#text'],
      cover: data.recenttracks.track[0].image[3]['#text'],
    }

    res.send(dataToReturn);
  } catch (error) {

  }
};

export default getLastTrack;
