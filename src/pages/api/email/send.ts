import { NextApiRequest, NextApiResponse } from 'next';
import { Base64 } from 'js-base64';
import { env } from 'process';

const send = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const values = JSON.parse(req.body);
        console.log(values);
        const url = `${env.EMAIL_LABS_API_URL}/new_sendmail`;

        const data = {
            from: 'mail@mateuszjablonski.com',
            subject: 'Wiadomość',
            smtp_account: '1.mateuszjablonski.smtp',
            to: {
                'mail@mateuszjablonski.com': {
                    message_id: 'aada'
                }
            },
            text: "<h1>Hello $$name$$</h1><p>Here your key: $$custom_key$$</p>"
        }

        const authKey = Base64.btoa(`${env.EMAIL_LABS_APP_KEY}:${env.EMAIL_LABS_SECRET_KEY}`)

        fetch(
            url, 
            {
                method: 'POST',
                headers: { 'Authorization': `Basic ${authKey}` },
                body: JSON.stringify(data),
            }
        )
        .then(response => response.json())
        .then(response => {
            console.log('restes', response)
            res.json(response)
        });

        console.log('after fetch');
        // console.log(res);
    } catch (e) {

    }
}

export default send;
