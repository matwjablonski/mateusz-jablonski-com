import { NextApiRequest, NextApiResponse } from 'next';
import { fetchEntries } from "../../../contentful";
import { formatDate } from '../../../utils/formatDate';
import { ar } from 'date-fns/locale';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.q) {
      throw new Error('Query is required');
    }

    if (req.query.q.length < 2) {
      throw new Error('Query must be at least 2 characters long');
    }

    let total = {
      articles: 0,
      podcasts: 0,
      total: 0,
    }

    const articlesRes = await fetchEntries({
      content_type: 'article',
      order: '-fields.createdDate',
      'fields.content[match]': req.query.q,
      select: 'fields.title,fields.createdDate,fields.slug',
    });

    total.articles = articlesRes.total;
    total.total = articlesRes.total;

    const articles = await articlesRes.data.map(p => ({
      ...p.fields,
      createdDate: formatDate({
          dateObject: p.fields?.createdDate,
          formatString: 'dd MMMM yyyy'
      }),
      type: 'blog',
    }));

    const podcastsRes = await fetchEntries({
      content_type: 'podcast',
      order: '-fields.createdDate',
      'fields.content[match]': req.query.q,
      select: 'fields.title,fields.createdDate,fields.slug,fields.podcast',
    });

    total.podcasts = podcastsRes.total;
    total.total += podcastsRes.total;

    const podcasts = await podcastsRes.data.map(p => ({
      ...p.fields,
      createdDate: formatDate({
          dateObject: p.fields?.createdDate,
          formatString: 'dd MMMM yyyy'
      }),
      type: 'podcast',
    }));

    const result = [...articles, ...podcasts];
    

    res.status(200).json({ data: result, total });
  } catch (e) {
    res.status(400);

    res.send({ status: 'error', message: e.message });
  }
};

export default search;
