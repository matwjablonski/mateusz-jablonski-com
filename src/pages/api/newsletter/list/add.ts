import { NextApiRequest, NextApiResponse } from 'next';
import { addListMember } from '../../../../lib/mailchimp/addListMember';


const add = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = JSON.parse(req.body);
        const response = await addListMember(email);

        res.send({ status: response.status, message: 'Udało się! Twój adres email został zapisany poprawnie.' }); 
    } catch(e) {
        const text = JSON.parse(e.response.text);
        res.status(text.status);
        
        res.send({ status: text.status, message: 'Podany email jest błędny lub wcześniej został już zapisany w naszej bazie danych.'});
    }    
};

export default add;
