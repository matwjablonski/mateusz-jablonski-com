import { ColumnType, Generated } from 'kysely';

export interface Database {
  workshops: WorkshopsTable;
  past_workshops: PastWorkshopsTable;
  poll_responses: PollResponsesTable;
}

export interface WorkshopsTable {
  id: Generated<number>;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  days: number | null;
  cost_per_user: number | null;
  currency: string | null;
  max_participants: number | null;
  city_or_remote: string | null;
  program: string | null;
  is_active: boolean;
  order: number;
  is_featured: boolean;
  level: string | null;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
}

export interface PastWorkshopsTable {
  id: Generated<number>;
  workshop_id: number | null;
  date: string;
  poll_access_code: string;
  students: string[] | null;
  is_closed: boolean;
  created_at: ColumnType<Date, string | undefined, never> | null;
}

export interface PollResponsesTable {
  id: Generated<number>;
  past_workshop_id: number;
  trainer_knowledge: number;
  trainer_experience: number;
  trainer_communication: number;
  trainer_engagement: number;
  trainer_questions: number;
  trainer_openness: number;
  trainer_culture: number;
  workshops_content: number;
  workshops_realization: number;
  workshops_duration: number;
  your_knowledge_before: number;
  your_knowledge_after: number;
  your_knowledge_usefulness: number;
  your_opinion_about_workshops: string;
  your_opinion_about_materials: string;
  newsletter_email: string | null;
  submitted_at: ColumnType<Date, never, never>;
}
