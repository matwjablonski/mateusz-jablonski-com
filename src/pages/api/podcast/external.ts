import { NextApiRequest, NextApiResponse } from "next";

const getPodcastSource = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { source } = req.query;

    const headers = new Headers();

    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET');

    const fileRes = await fetch(source as string, { headers });
    const file = await fileRes.json();

    res.send(file);
  } catch(err) {

  }
};

export default getPodcastSource;
