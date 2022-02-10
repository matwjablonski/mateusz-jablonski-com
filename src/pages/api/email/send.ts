import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const send = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = JSON.parse(req.body);
        const url = `${env.FRESHMAIL_API_URL}/v3/messaging/emails`;

        const data = {
            from: {
                name: 'Mateusz',
                email: 'mail@mateuszjablonski.com'
            },
            subject: 'Wiadomość',
            recipients: [
                {
                    email: 'mat.w.jablonski@gmail.com',
                    name: 'Example Recipient',
                }
            ],
            contents: [
                {
                    type: "text/html",
                    body: "<h1>Hello $$name$$</h1><p>Here your key: $$custom_key$$</p>"
                }
            ]
        }

        console.log('before fetch');

        fetch(
            url, 
            {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${env.FRESHMAIL_TOKEN}`},
                body: JSON.stringify(data),
            }
        ).then(res => console.log(res));

        console.log('after fetch');
        // console.log(res);
    } catch (e) {

    }
}

export default send;
