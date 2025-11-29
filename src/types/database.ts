export interface Workshop {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  longDescription?: string | null;
  days?: number | null;
  costPerUser?: number | null;
  currency?: string | null;
  maxParticipants?: number | null;
  cityOrRemote?: string | null;
  program?: string | null;
  isActive?: boolean;
  order?: number;
  isFeatured?: boolean;
  level?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PastWorkshop {
  id: number;
  workshopId: number;
  date: string;
  pollAccessCode: string;
  isClosed: boolean;
  createdAt: Date;
}

export interface PollResponse {
  id: number;
  pastWorkshopId: number;
  trainerKnowledge: number;
  trainerExperience: number;
  trainerCommunication: number;
  trainerEngagement: number;
  trainerQuestions: number;
  trainerOpenness: number;
  trainerCulture: number;
  workshopsContent: number;
  workshopsRealization: number;
  workshopsDuration: number;
  yourKnowledgeBefore: number;
  yourKnowledgeAfter: number;
  yourKnowledgeUsefulness: number;
  yourOpinionAboutWorkshops: string;
  yourOpinionAboutMaterials: string;
  newsletterEmail?: string | null;
  submittedAt: Date;
}

export interface WorkshopBasicInfo {
  id: number;
  date: string;
  name: string;
  isClosed: boolean;
}

export interface WorkshopStats {
  workshopId: number;
  workshopName: string;
  totalEditions: number;
  totalResponses: number;
  averageRatings: {
    trainerKnowledge: number;
    trainerExperience: number;
    trainerCommunication: number;
    trainerEngagement: number;
    trainerQuestions: number;
    trainerOpenness: number;
    trainerCulture: number;
    workshopsContent: number;
    workshopsRealization: number;
    workshopsDuration: number;
    yourKnowledgeBefore: number;
    yourKnowledgeAfter: number;
    yourKnowledgeUsefulness: number;
  };
}
