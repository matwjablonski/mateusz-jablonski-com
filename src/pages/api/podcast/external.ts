import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosHeaders } from 'axios';

const getPodcastSource = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { source } = req.query;

    console.log(source);

    const headers = new AxiosHeaders();

    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET');

    const file = await axios.get(source as string, {
      headers
    });

    res.send(file);
  } catch(err) {

  }
};

export default getPodcastSource;
