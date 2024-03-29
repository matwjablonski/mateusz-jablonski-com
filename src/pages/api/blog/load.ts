import { NextApiRequest, NextApiResponse } from "next";
import { fetchEntries } from "../../../contentful";
import { formatDate } from "../../../utils/formatDate";

const load = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { limit, skip } = req.query;

        const articlesRes = await fetchEntries({
            content_type: 'article',
            include: 2,
            skip: skip,
            limit: limit,
            order: '-fields.createdDate',
            'fields.createdDate[lte]': formatDate({
                dateObject: new Date(),
                formatString: 'yyyy-MM-dd HH:mm:ss'
            }),
        });

        const articles = await articlesRes.data.map(p => ({
            ...p.fields,
            createdDate: formatDate({
                dateObject: p.fields?.createdDate,
                formatString: 'dd MMMM yyyy'
            }),
        }));

        res.status(200).json(articles);
    }
    catch (e) {
        res.status(400);

        res.send({ status: 'notfetched', message: 'Ups. Nie udało się pobrać więcej artykułów.'})
    }
}

export default load;
