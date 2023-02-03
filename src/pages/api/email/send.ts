import { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { env } from 'process';

sgMail.setApiKey(env.SENDGRID_API_KEY)

const selectTopic = (topic: string) => {
    switch (topic) {
        case 'workshop': 
            return 'Zapytanie o warszaty';
        case 'mentoring':
            return 'Zapytanie o mentoring';
        case 'project':
            return 'Zapytanie o projekt';
        case 'job':
            return 'Oferta pracy';
        default: 
            return 'Inny temat';
    }
};

const send = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const values = JSON.parse(req.body);

        const data: MailDataRequired = {
            to: 'mail@mateuszjablonski.com',
            from: 'mail@mateuszjablonski.com',
            subject: 'Wiadomość ze strony www',
            html: `
                <h2>Wiadomość ze strony od ${values.name}</h2>
                <ul>
                    <li>Nadawca: ${values.name} (${values.email} ${values.phone})</li>
                    <li>Temat: ${selectTopic(values.topic)}</li>
                    <li>Forma kontaktu: ${values.prefferedForm}</li>
                </ul>
            `
        };

        await sgMail.send(data);

        res.json('Wiadomość wysłana.');
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)

            res.status(500);
            res.send(error.response.body)
        }
    }
}

export default send;
