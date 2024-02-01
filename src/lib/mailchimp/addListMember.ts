import { env } from 'process';

const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
    apiKey: env.MAILCHIMP_API_KEY,
    server: env.MAILCHIMP_DATA_CENTER,
});

export const addListMember = async (email: string) => {
  return await mailchimp.lists.addListMember(env.MAILCHIMP_LIST_ID, { email_address: email, status: 'subscribed' });
}
