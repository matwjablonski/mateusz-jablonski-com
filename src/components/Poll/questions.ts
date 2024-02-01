import OneIcon from '../../public/icons/square-number-1.svg';
import TwoIcon from '../../public/icons/square-number-2.svg';
import ThreeIcon from '../../public/icons/square-number-3.svg';
import FourIcon from '../../public/icons/square-number-4.svg';
import FiveIcon from '../../public/icons/square-number-5.svg';

const goodOrBadNotes = [
  {
    value: '1',
    label: 'Fatalnie',
    icon: OneIcon,
    iconWidth: 24,
  },
  {
      value: '2',
      label: 'Kiepsko',
      icon: TwoIcon,
      iconWidth: 24,
  },
  {
      value: '3',
      label: 'Tak sobie',
      icon: ThreeIcon,
      iconWidth: 24,
  },
  {
      value: '4',
      label: 'Dobrze',
      icon: FourIcon,
      iconWidth: 24,
  },
  {
      value: '5',
      label: 'Bardzo dobrze',
      icon: FiveIcon,
      iconWidth: 24,
  },
];

const knowledgeNotes = [
  {
    value: '1',
    label: 'Brak wiedzy',
    icon: OneIcon,
    iconWidth: 24,
  },
  {
      value: '2',
      label: 'Niewielka wiedza',
      icon: TwoIcon,
      iconWidth: 24,
  },
  {
      value: '3',
      label: 'Coś tam wiem',
      icon: ThreeIcon,
      iconWidth: 24,
  },
  {
      value: '4',
      label: 'Ogarniam temat',
      icon: FourIcon,
      iconWidth: 24,
  },
  {
      value: '5',
      label: 'Profesjonalista / Profesjonalistka',
      icon: FiveIcon,
      iconWidth: 24,
  },
];

const trainerQuestions = [
  {
    id: 'trainerKnowledge',
    question: 'Dysponował wiedzą w zakresie omawianych tematów',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'trainerExperience',
    question: 'Dysponował doświadczeniem w zakresie omawianych tematów',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'trainerCommunication',
    question: 'Przekazywał informacje systematycznie i skutecznie',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'trainerEngagement',
    question: 'Był komunikatywny i zaangażowany',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'trainerQuestions',
    question: 'Starał się nie pozostawiać pytań bez odpowiedzi',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'trainerOpenness',
    question: 'Był otwarty na potrzeby grupy',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'trainerCulture',
    question: 'Cechowała go wysoka kultura osobista',
    description: '',
    options: goodOrBadNotes,
  },
];

const workshopsQuestions = [
  {
    id: 'workshopsContent',
    question: 'Zagadnienia w programie szkolenia zostały właściwie dobrane',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'workshopsRealization',
    question: 'Program szkolenia został zrealizowany w odpowiednim stopniu',
    description: '',
    options: goodOrBadNotes,
  },
  {
    id: 'workshopsDuration',
    question: 'Czas trwania został dobrany do zawartości programu',
    description: '',
    options: goodOrBadNotes,
  },
];

const yourKnowledgeQuestions = [
  {
    id: 'yourKnowledgeBefore',
    question: 'Jak oceniasz swój poziom wiedzy PRZED szkoleniem?',
    options: knowledgeNotes,
  },
  {
    id: 'yourKnowledgeAfter',
    question: 'Jak oceniasz swój poziom wiedzy PO szkoleniu?',
    options: knowledgeNotes,
  },
  {
    id: 'yourKnowledgeUsefulness',
    question: 'Jak oceniasz przydatność wiedzy przekazanej na szkoleniu?',
    options: goodOrBadNotes,
  },
];

export const pollSteps = [
  {
    id: 'trainer',
    title: 'Jak oceniasz przygotowanie prowadzącego?',
    description: 'W skali od 1 do 5, gdzie 1 to fatalnie, a 5 to bardzo dobrze.',
    type: 'options',
    questions: trainerQuestions,
  },
  {
    id: 'workshops',
    title: 'Jak oceniasz szkolenie?',
    description: 'W skali od 1 do 5, gdzie 1 to fatalnie, a 5 to bardzo dobrze.',
    type: 'options',
    questions: workshopsQuestions,
  },
  {
    id: 'yourKnowledge',
    title: 'Jak oceniasz swój poziom wiedzy?',
    description: 'W skali od 1 do 5, gdzie 1 to brak wiedzy, a 5 to profesjonalista / profesjonalistka.',
    type: 'options',
    questions: yourKnowledgeQuestions,
  },
  {
    id: 'yourOpinion',
    title: 'Co chciał(a)byś przekazać prowadzącemu?',
    description: 'Będę wdzięczny za każdą opinię. Pozwolają mi one ulepszać moją pracę w przyszłości. Wprowadzać nowości i poprawiać błędy.',
    type: 'textarea',
    questions: [
      {
        id: 'yourOpinionAboutWorkshops',
        question: 'Co wg Ciebie można poprawić / ulepszyć / zmienić lub co powinno pozostać bez zmian? Jak podobało Ci się szkolenie?',
      },
      {
        id: 'yourOpinionAboutMaterials',
        question: 'Co myślisz o materiałach szkoleniowych? Prezentacji, gadżetach, certyfikatach itp.',
      },
    ],
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Chcesz otrzymywać informacje o nowych szkoleniach i materiałach? Podaj swój adres email, a zostanie on dopisany do mojej listy mailingowej.',
    type: 'newsletter',
    questions: [
      {
        id: 'newsletterEmail',
        question: 'Twój adres email',
      },
    ],
  }
];
