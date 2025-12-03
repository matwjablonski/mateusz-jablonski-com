import { db } from './client';
import { WorkshopBasicInfo, PollResponse, WorkshopStats } from '../../types/database';

export const getWorkshopById = async (id: number): Promise<WorkshopBasicInfo | null> => {
  if (!id) {
    throw new Error('Workshop ID is required');
  }

  const result = await db
    .selectFrom('past_workshops')
    .innerJoin('workshops', 'workshops.id', 'past_workshops.workshop_id')
    .select([
      'past_workshops.id as id',
      'past_workshops.date as date',
      'workshops.name as name',
      'past_workshops.is_closed as isClosed',
    ])
    .where('past_workshops.id', '=', id)
    .executeTakeFirst();

  if (!result) {
    return null;
  }

  return result;
};

export const verifyPollAccess = async (pollId: number, accessCode: string): Promise<boolean> => {
  if (!pollId || !accessCode) {
    throw new Error('Poll ID and access code are required');
  }

  const workshop = await db
    .selectFrom('past_workshops')
    .select(['id'])
    .where('id', '=', pollId)
    .where('poll_access_code', '=', accessCode)
    .executeTakeFirst();

  if (!workshop) {
    throw new Error('Poll not found');
  }

  return true;
};

/**
 * Saves poll response to database
 */
export const savePollResponse = async (pollResponse: Omit<PollResponse, 'id' | 'submittedAt'>): Promise<void> => {
  await db
    .insertInto('poll_responses')
    .values({
      past_workshop_id: pollResponse.pastWorkshopId,
      trainer_knowledge: pollResponse.trainerKnowledge,
      trainer_experience: pollResponse.trainerExperience,
      trainer_communication: pollResponse.trainerCommunication,
      trainer_engagement: pollResponse.trainerEngagement,
      trainer_questions: pollResponse.trainerQuestions,
      trainer_openness: pollResponse.trainerOpenness,
      trainer_culture: pollResponse.trainerCulture,
      workshops_content: pollResponse.workshopsContent,
      workshops_realization: pollResponse.workshopsRealization,
      workshops_duration: pollResponse.workshopsDuration,
      your_knowledge_before: pollResponse.yourKnowledgeBefore,
      your_knowledge_after: pollResponse.yourKnowledgeAfter,
      your_knowledge_usefulness: pollResponse.yourKnowledgeUsefulness,
      your_opinion_about_workshops: pollResponse.yourOpinionAboutWorkshops,
      your_opinion_about_materials: pollResponse.yourOpinionAboutMaterials,
      newsletter_email: pollResponse.newsletterEmail || null,
    })
    .execute();
};

export const getPollResponsesByPastWorkshopId = async (pastWorkshopId: number): Promise<PollResponse[]> => {
  const responses = await db
    .selectFrom('poll_responses')
    .selectAll()
    .where('past_workshop_id', '=', pastWorkshopId)
    .execute();

  return responses.map(r => ({
    id: r.id,
    pastWorkshopId: r.past_workshop_id,
    trainerKnowledge: r.trainer_knowledge,
    trainerExperience: r.trainer_experience,
    trainerCommunication: r.trainer_communication,
    trainerEngagement: r.trainer_engagement,
    trainerQuestions: r.trainer_questions,
    trainerOpenness: r.trainer_openness,
    trainerCulture: r.trainer_culture,
    workshopsContent: r.workshops_content,
    workshopsRealization: r.workshops_realization,
    workshopsDuration: r.workshops_duration,
    yourKnowledgeBefore: r.your_knowledge_before,
    yourKnowledgeAfter: r.your_knowledge_after,
    yourKnowledgeUsefulness: r.your_knowledge_usefulness,
    yourOpinionAboutWorkshops: r.your_opinion_about_workshops,
    yourOpinionAboutMaterials: r.your_opinion_about_materials,
    newsletterEmail: r.newsletter_email,
    submittedAt: r.submitted_at,
  }));
};

export const getWorkshopAverageRating = async (workshopId: number): Promise<number | null> => {
  const statsResult = await db
    .selectFrom('poll_responses')
    .innerJoin('past_workshops', 'past_workshops.id', 'poll_responses.past_workshop_id')
    .select([
      db.fn.avg<number>('poll_responses.trainer_knowledge').as('avg_trainer_knowledge'),
      db.fn.avg<number>('poll_responses.trainer_experience').as('avg_trainer_experience'),
      db.fn.avg<number>('poll_responses.trainer_communication').as('avg_trainer_communication'),
      db.fn.avg<number>('poll_responses.trainer_engagement').as('avg_trainer_engagement'),
      db.fn.avg<number>('poll_responses.trainer_questions').as('avg_trainer_questions'),
      db.fn.avg<number>('poll_responses.trainer_openness').as('avg_trainer_openness'),
      db.fn.avg<number>('poll_responses.trainer_culture').as('avg_trainer_culture'),
      db.fn.avg<number>('poll_responses.workshops_content').as('avg_workshops_content'),
      db.fn.avg<number>('poll_responses.workshops_realization').as('avg_workshops_realization'),
      db.fn.avg<number>('poll_responses.workshops_duration').as('avg_workshops_duration'),
      db.fn.avg<number>('poll_responses.your_knowledge_before').as('avg_your_knowledge_before'),
      db.fn.avg<number>('poll_responses.your_knowledge_after').as('avg_your_knowledge_after'),
      db.fn.avg<number>('poll_responses.your_knowledge_usefulness').as('avg_your_knowledge_usefulness'),
    ])
    .where('past_workshops.workshop_id', '=', workshopId)
    .executeTakeFirst();

  if (!statsResult) {
    return null;
  }

  const averages = [
    Number(statsResult.avg_trainer_knowledge),
    Number(statsResult.avg_trainer_experience),
    Number(statsResult.avg_trainer_communication),
    Number(statsResult.avg_trainer_engagement),
    Number(statsResult.avg_trainer_questions),
    Number(statsResult.avg_trainer_openness),
    Number(statsResult.avg_trainer_culture),
    Number(statsResult.avg_workshops_content),
    Number(statsResult.avg_workshops_realization),
    Number(statsResult.avg_workshops_duration),
    Number(statsResult.avg_your_knowledge_before),
    Number(statsResult.avg_your_knowledge_after),
    Number(statsResult.avg_your_knowledge_usefulness),
  ].filter((val): val is number => val !== null && val !== undefined);

  if (averages.length === 0) {
    return null;
  }

  const overallAverage = averages.reduce((sum, val) => sum + val, 0) / averages.length;
  return Math.round(overallAverage * 100) / 100;
};

export const getWorkshopStats = async (workshopId: number): Promise<WorkshopStats | null> => {
  const editionsResult = await db
    .selectFrom('past_workshops')
    .select(db.fn.count<number>('id').as('count'))
    .where('workshop_id', '=', workshopId)
    .executeTakeFirst();

  const totalEditions = editionsResult?.count || 0;

  if (totalEditions === 0) {
    return null;
  }

  const statsResult = await db
    .selectFrom('poll_responses')
    .innerJoin('past_workshops', 'past_workshops.id', 'poll_responses.past_workshop_id')
    .innerJoin('workshops', 'workshops.id', 'past_workshops.workshop_id')
    .select([
      'workshops.id as workshop_id',
      'workshops.name as workshop_name',
      db.fn.count<number>('poll_responses.id').as('total_responses'),
      db.fn.avg<number>('poll_responses.trainer_knowledge').as('avg_trainer_knowledge'),
      db.fn.avg<number>('poll_responses.trainer_experience').as('avg_trainer_experience'),
      db.fn.avg<number>('poll_responses.trainer_communication').as('avg_trainer_communication'),
      db.fn.avg<number>('poll_responses.trainer_engagement').as('avg_trainer_engagement'),
      db.fn.avg<number>('poll_responses.trainer_questions').as('avg_trainer_questions'),
      db.fn.avg<number>('poll_responses.trainer_openness').as('avg_trainer_openness'),
      db.fn.avg<number>('poll_responses.trainer_culture').as('avg_trainer_culture'),
      db.fn.avg<number>('poll_responses.workshops_content').as('avg_workshops_content'),
      db.fn.avg<number>('poll_responses.workshops_realization').as('avg_workshops_realization'),
      db.fn.avg<number>('poll_responses.workshops_duration').as('avg_workshops_duration'),
      db.fn.avg<number>('poll_responses.your_knowledge_before').as('avg_your_knowledge_before'),
      db.fn.avg<number>('poll_responses.your_knowledge_after').as('avg_your_knowledge_after'),
      db.fn.avg<number>('poll_responses.your_knowledge_usefulness').as('avg_your_knowledge_usefulness'),
    ])
    .where('workshops.id', '=', workshopId)
    .groupBy(['workshops.id', 'workshops.name'])
    .executeTakeFirst();

  if (!statsResult) {
    return null;
  }

  return {
    workshopId: statsResult.workshop_id,
    workshopName: statsResult.workshop_name,
    totalEditions,
    totalResponses: statsResult.total_responses,
    averageRatings: {
      trainerKnowledge: statsResult.avg_trainer_knowledge,
      trainerExperience: statsResult.avg_trainer_experience,
      trainerCommunication: statsResult.avg_trainer_communication,
      trainerEngagement: statsResult.avg_trainer_engagement,
      trainerQuestions: statsResult.avg_trainer_questions,
      trainerOpenness: statsResult.avg_trainer_openness,
      trainerCulture: statsResult.avg_trainer_culture,
      workshopsContent: statsResult.avg_workshops_content,
      workshopsRealization: statsResult.avg_workshops_realization,
      workshopsDuration: statsResult.avg_workshops_duration,
      yourKnowledgeBefore: statsResult.avg_your_knowledge_before,
      yourKnowledgeAfter: statsResult.avg_your_knowledge_after,
      yourKnowledgeUsefulness: statsResult.avg_your_knowledge_usefulness,
    },
  };
};
