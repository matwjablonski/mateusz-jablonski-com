import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'contentful-management'
import { env } from 'process';

const defaultLanguageCode = 'pl-PL';

const client = createClient(
    {
        accessToken: env.CONTENTFUL_CMA_TOKEN_COMMENTS,
    },
    {
        type: 'plain',
        defaults: {
            spaceId: env.CONTENTFUL_SPACE_ID,
            environmentId: env.CONTENTFUL_ENV_ID,
        },
    }
)

const addComment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = JSON.parse(req.body);

        const a = await client.entry.create(
            {
                contentTypeId: 'comment'
            },
            {
                fields: {
                    article: {
                        [defaultLanguageCode]: {
                            sys: {
                                type: 'Link',
                                linkType: 'Entry',
                                id,
                            }
                        }
                    },
                    message: {
                        [defaultLanguageCode]: 'tests'
                    }
                }
            }
        );

        res.send({ status: 'saved', message: 'Udało się! Twój komentarz został zapisany poprawnie. Oczekuje na akceptację.' }); 
    } catch(e) {
        res.status(400);

        res.send({ status: 'notsaved', message: 'Ups. Nie udało się zapisać Twojego komentarza. Spróbuj ponownie później.'})
    }
}

export default addComment;
