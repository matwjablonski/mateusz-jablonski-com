import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
    apiKey: env.MAILCHIMP_API_KEY,
    server: env.MAILCHIMP_DATA_CENTER,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = JSON.parse(req.body);
        const response = await mailchimp.lists.addListMember(env.MAILCHIMP_LIST_ID, { email_address: email, status: 'subscribed' });

        res.send({ status: response.status, message: 'Success' }); 
    } catch(e) {
        const text = JSON.parse(e.response.text);
        res.send(text);
    }    
}