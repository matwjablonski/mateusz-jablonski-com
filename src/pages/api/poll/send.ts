import { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { env } from 'process';
import { subscribeNewsletter } from '../../../lib/subscribeNewsletter';
import { addListMember } from '../../../lib/mailchimp/addListMember';

sgMail.setApiKey(env.SENDGRID_API_KEY)

const calculateAverage = (values: number[]) => {
  const sum = values.reduce((a, b) => a + b, 0);

  return (Math.round((sum / values.length * 100)) / 100);
}

const send = async (req: NextApiRequest, res: NextApiResponse  ) => {
  try {
    const values = JSON.parse(req.body);

    const {
      date,
      name,
      trainerKnowledge,
      trainerExperience,
      trainerCommunication,
      trainerEngagement,
      trainerQuestions,
      trainerOpenness,
      trainerCulture,
      workshopsContent,
      workshopsRealization,
      workshopsDuration,
      yourKnowledgeBefore,
      yourKnowledgeAfter,
      yourKnowledgeUsefulness,
      yourOpinionAboutWorkshops,
      yourOpinionAboutMaterials,
      newsletterEmail,
    } = values;

    const data: MailDataRequired = {
      to: 'mail@mateuszjablonski.com',
      from: 'mail@mateuszjablonski.com',
      subject: `Ankieta do szkolenia z dnia ${date}`,
      html: `
        <h2>Ankieta do szkolenia: ${name}</h2>
        <p>z dnia ${date}</p>
        <h3>Jak oceniasz przygotowanie prowadzącego?</h3>
        <ul>
            <li>Dysponował wiedzą w zakresie omawianych tematów: ${trainerKnowledge}</li>
            <li>Dysponował doświadczeniem w zakresie omawianych tematów: ${trainerExperience}</li>
            <li>Przekazywał informacje systematycznie i skutecznie: ${trainerCommunication}</li>
            <li>Był komunikatywny i zaangażowany: ${trainerEngagement}</li>
            <li>Starał się nie pozostawiać pytań bez odpowiedzi: ${trainerQuestions}</li>
            <li>Był otwarty na potrzeby grupy: ${trainerOpenness}</li>
            <li>Cechowała go wysoka kultura osobista: ${trainerCulture}</li>
        </ul>
        <p><strong>Średnia ocena: ${
          calculateAverage([+trainerKnowledge, +trainerExperience, +trainerCommunication, +trainerEngagement, +trainerQuestions, +trainerOpenness, +trainerCulture])
        }</strong></p>
        <h3>Jak oceniasz szkolenie?</h3>
        <ul>
          <li>Zagadnienia w programie szkolenia zostały właściwie dobrane: ${workshopsContent}</li>
          <li>Program szkolenia został zrealizowany w odpowiednim stopniu: ${workshopsRealization}</li>
          <li>Czas trwania szkolenia był odpowiedni: ${workshopsDuration}</li>
        </ul>
        <p><strong>Średnia ocena: ${
          calculateAverage([+workshopsContent, +workshopsRealization, +workshopsDuration])
        }</strong></p>
        <h3>Jak oceniasz swój poziom wiedzy?</h3>
        <ul>
          <li>Jak oceniasz swój poziom wiedzy PRZED szkoleniem?: ${yourKnowledgeBefore}</li>
          <li>Jak oceniasz swój poziom wiedzy PO szkoleniu?: ${yourKnowledgeAfter}</li>
          <li>Jak oceniasz przydatność wiedzy przekazanej na szkoleniu?: ${yourKnowledgeUsefulness}</li>
        </ul>
        <h3>Co chciał(a)byś przekazać prowadzącemu?</h3>
        <ul>
          <li>
            <h4>Co wg Ciebie można poprawić / ulepszyć / zmienić lub co powinno pozostać bez zmian? Jak podobało Ci się szkolenie?</h4>
            <p>${yourOpinionAboutWorkshops}</p>
          </li>
          <li>
            <h4>Co myślisz o materiałach szkoleniowych? Prezentacji, gadżetach, certyfikatach itp.</h4>
            <p>${yourOpinionAboutMaterials}</p>
          </li>
        </ul>
        ${newsletterEmail ? `<p>Chcę zapisać się do newslettera: ${newsletterEmail}</p>` : ''}
        <p>Pozdrawiam</p>
      `,
    };

    await sgMail.send(data);

    if (newsletterEmail) {
      await addListMember(newsletterEmail);
    }

    res.send({ status: 'success', message: 'Ankieta została zapisana. Dziękuję za wypełnienie.'});
  } catch (err) {

  }
}

export default send;
