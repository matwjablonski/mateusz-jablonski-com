import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
    apiKey: env.MAILCHIMP_API_KEY,
    server: env.MAILCHIMP_DATA_CENTER,
});

const add = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = JSON.parse(req.body);
        const response = await mailchimp.lists.addListMember(env.MAILCHIMP_LIST_ID, { email_address: email, status: 'subscribed' });

        res.send({ status: response.status, message: 'Udało się! Twój adres email został zapisany poprawnie.' }); 
    } catch(e) {
        const text = JSON.parse(e.response.text);
        res.status(text.status);
        
        res.send({ status: text.status, message: 'Podany email jest błędny lub wcześniej został już zapisany w naszej bazie danych.'});
    }    
};

export default add;