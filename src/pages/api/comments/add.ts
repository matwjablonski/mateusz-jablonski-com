import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'contentful-management'
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { env } from 'process';

sgMail.setApiKey(env.SENDGRID_API_KEY)

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
        const { id, author, message, email } = JSON.parse(req.body);

        await client.entry.create(
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
                        [defaultLanguageCode]: message,
                    },
                    author: {
                        [defaultLanguageCode]: author,
                    },
                    email: {
                        [defaultLanguageCode]: email,
                    },
                }
            }
        );

        const data: MailDataRequired = {
            to: 'mail@mateuszjablonski.com',
            from: 'mail@mateuszjablonski.com',
            subject: 'Nowy komentarz do artykułu',
            html: `
                <h2>Dodano nowy komentarz od ${author}</h2>
                <ul>
                    <li>Autor: ${author} (${email})</li>
                    <li>Treść: ${message}</li>
                </ul>
            `
        };

        await sgMail.send(data);

        res.send({ status: 'saved', message: 'Udało się! Twój komentarz został zapisany poprawnie. Oczekuje na akceptację.' }); 
    } catch(e) {
        res.status(400);

        res.send({ status: 'notsaved', message: 'Ups. Nie udało się zapisać Twojego komentarza. Spróbuj ponownie później.'})
    }
}

export default addComment;
