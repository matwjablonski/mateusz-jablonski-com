import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {}
    catch (e) {
        res.status(400);

        res.send({ status: 'notfetched', message: 'Ups. Nie udało się pobrać więcej artykułów.'})
    }
}