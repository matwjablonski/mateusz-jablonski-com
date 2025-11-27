import OneIcon from '../../public/icons/square-number-1.svg';
import TwoIcon from '../../public/icons/square-number-2.svg';
import ThreeIcon from '../../public/icons/square-number-3.svg';
import FourIcon from '../../public/icons/square-number-4.svg';
import FiveIcon from '../../public/icons/square-number-5.svg';
import pl from '../../data/translations/pl';

const getGoodOrBadNotes = (t: typeof pl) => [
  {
    value: '1',
    label: t.POLL.ANSWERS.GOOD_OR_BAD.ONE,
    icon: OneIcon,
    iconWidth: 24,
  },
  {
      value: '2',
      label: t.POLL.ANSWERS.GOOD_OR_BAD.TWO,
      icon: TwoIcon,
      iconWidth: 24,
  },
  {
      value: '3',
      label: t.POLL.ANSWERS.GOOD_OR_BAD.THREE,
      icon: ThreeIcon,
      iconWidth: 24,
  },
  {
      value: '4',
      label: t.POLL.ANSWERS.GOOD_OR_BAD.FOUR,
      icon: FourIcon,
      iconWidth: 24,
  },
  {
      value: '5',
      label: t.POLL.ANSWERS.GOOD_OR_BAD.FIVE,
      icon: FiveIcon,
      iconWidth: 24,
  },
];

const getKnowledgeNotes = (t: typeof pl) => [
  {
    value: '1',
    label: t.POLL.ANSWERS.KNOWLEDGE_NOTES.ONE,
    icon: OneIcon,
    iconWidth: 24,
  },
  {
      value: '2',
      label: t.POLL.ANSWERS.KNOWLEDGE_NOTES.TWO,
      icon: TwoIcon,
      iconWidth: 24,
  },
  {
      value: '3',
      label: t.POLL.ANSWERS.KNOWLEDGE_NOTES.THREE,
      icon: ThreeIcon,
      iconWidth: 24,
  },
  {
      value: '4',
      label: t.POLL.ANSWERS.KNOWLEDGE_NOTES.FOUR,
      icon: FourIcon,
      iconWidth: 24,
  },
  {
      value: '5',
      label: t.POLL.ANSWERS.KNOWLEDGE_NOTES.FIVE,
      icon: FiveIcon,
      iconWidth: 24,
  },
];

const getTrainerQuestions = (t: typeof pl) => [
  {
    id: 'trainerKnowledge',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_KNOWLEDGE,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'trainerExperience',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_EXPERIENCE,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'trainerCommunication',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_COMMUNICATION,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'trainerEngagement',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_ENGAGEMENT,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'trainerQuestions',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_QUESTIONS,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'trainerOpenness',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_OPENNESS,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'trainerCulture',
    question: t.POLL.QUESTIONS.TRAINER_PREPARATION.INTERNAL_QUESTIONS.TRAINER_CULTURE,
    description: '',
    options: getGoodOrBadNotes(t),
  },
];

const getWorkshopsQuestions = (t: typeof pl) => [
  {
    id: 'workshopsContent',
    question: t.POLL.QUESTIONS.WORKSHOPS.INTERNAL_QUESTIONS.WORKSHOPS_CONTENT,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'workshopsRealization',
    question: t.POLL.QUESTIONS.WORKSHOPS.INTERNAL_QUESTIONS.WORKSHOPS_REALIZATION,
    description: '',
    options: getGoodOrBadNotes(t),
  },
  {
    id: 'workshopsDuration',
    question: t.POLL.QUESTIONS.WORKSHOPS.INTERNAL_QUESTIONS.WORKSHOPS_DURATION,
    description: '',
    options: getGoodOrBadNotes(t),
  },
];

const getYourKnowledgeQuestions = (t: typeof pl) => [
  {
    id: 'yourKnowledgeBefore',
    question: t.POLL.QUESTIONS.YOUR_KNOWLEDGE.INTERNAL_QUESTIONS.YOUR_KNOWLEDGE_BEFORE,
    options: getKnowledgeNotes(t),
  },
  {
    id: 'yourKnowledgeAfter',
    question: t.POLL.QUESTIONS.YOUR_KNOWLEDGE.INTERNAL_QUESTIONS.YOUR_KNOWLEDGE_AFTER,
    options: getKnowledgeNotes(t),
  },
  {
    id: 'yourKnowledgeUsefulness',
    question: t.POLL.QUESTIONS.YOUR_KNOWLEDGE.INTERNAL_QUESTIONS.YOUR_KNOWLEDGE_USEFULNESS,
    options: getGoodOrBadNotes(t),
  },
];

export const getPollSteps = (t: typeof pl) => [
  {
    id: 'trainer',
    title: t.POLL.QUESTIONS.TRAINER_PREPARATION.TITLE,
    description: t.POLL.QUESTIONS.TRAINER_PREPARATION.DESCRIPTION,
    type: 'options',
    questions: getTrainerQuestions(t),
  },
  {
    id: 'workshops',
    title: t.POLL.QUESTIONS.WORKSHOPS.TITLE,
    description: t.POLL.QUESTIONS.WORKSHOPS.DESCRIPTION,
    type: 'options',
    questions: getWorkshopsQuestions(t),
  },
  {
    id: 'yourKnowledge',
    title: t.POLL.QUESTIONS.YOUR_KNOWLEDGE.TITLE,
    description: t.POLL.QUESTIONS.YOUR_KNOWLEDGE.DESCRIPTION,
    type: 'options',
    questions: getYourKnowledgeQuestions(t),
  },
  {
    id: 'yourOpinion',
    title: t.POLL.QUESTIONS.YOUR_OPINION.TITLE,
    description: t.POLL.QUESTIONS.YOUR_OPINION.DESCRIPTION,
    type: 'textarea',
    questions: [
      {
        id: 'yourOpinionAboutWorkshops',
        question: t.POLL.QUESTIONS.YOUR_OPINION.INTERNAL_QUESTIONS.YOUR_OPINION_ABOUT_WORKSHOPS,
      },
      {
        id: 'yourOpinionAboutMaterials',
        question: t.POLL.QUESTIONS.YOUR_OPINION.INTERNAL_QUESTIONS.YOUR_OPINION_ABOUT_MATERIALS,
      },
    ],
  },
  {
    id: 'newsletter',
    title: t.POLL.NEWSLETTER_OPTION.TITLE,
    description: t.POLL.NEWSLETTER_OPTION.DESCRIPTION,
    type: 'newsletter',
    questions: [
      {
        id: 'newsletterEmail',
        question: t.POLL.NEWSLETTER_OPTION.YOUR_EMAIL,
      },
    ],
  }
];
