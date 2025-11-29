import { db } from './client';
import { Workshop } from '../../types/database';

export const getAllWorkshops = async (): Promise<Workshop[]> => {
  const workshops = await db
    .selectFrom('workshops')
    .selectAll()
    .where('is_active', '=', true)
    .orderBy('order', 'asc')
    .orderBy('created_at', 'desc')
    .execute();

  return workshops.map(w => ({
    id: w.id,
    name: w.name,
    slug: w.slug,
    description: w.description,
    longDescription: w.long_description,
    days: w.days,
    costPerUser: w.cost_per_user ? Number(w.cost_per_user) : null,
    currency: w.currency,
    maxParticipants: w.max_participants,
    cityOrRemote: w.city_or_remote,
    program: w.program,
    isActive: w.is_active,
    order: w.order,
    isFeatured: w.is_featured,
    level: w.level,
    createdAt: w.created_at.toISOString(),
    updatedAt: w.updated_at.toISOString(),
  }));
};

export const getWorkshopBySlug = async (slug: string): Promise<Workshop | null> => {
  if (!slug) {
    throw new Error('Workshop slug is required');
  }

  const workshop = await db
    .selectFrom('workshops')
    .selectAll()
    .where('slug', '=', slug)
    .where('is_active', '=', true)
    .executeTakeFirst();

  if (!workshop) {
    return null;
  }

  return {
    id: workshop.id,
    name: workshop.name,
    slug: workshop.slug,
    description: workshop.description,
    longDescription: workshop.long_description,
    days: workshop.days,
    costPerUser: workshop.cost_per_user ? Number(workshop.cost_per_user) : null,
    currency: workshop.currency,
    maxParticipants: workshop.max_participants,
    cityOrRemote: workshop.city_or_remote,
    program: workshop.program,
    isActive: workshop.is_active,
    order: workshop.order,
    isFeatured: workshop.is_featured,
    level: workshop.level,
    createdAt: workshop.created_at.toISOString(),
    updatedAt: workshop.updated_at.toISOString(),
  };
};

export const getFeaturedWorkshops = async (): Promise<Workshop[]> => {
  const workshops = await db
    .selectFrom('workshops')
    .selectAll()
    .where('is_active', '=', true)
    .where('is_featured', '=', true)
    .orderBy('order', 'asc')
    .orderBy('created_at', 'desc')
    .execute();

  return workshops.map(w => ({
    id: w.id,
    name: w.name,
    slug: w.slug,
    description: w.description,
    longDescription: w.long_description,
    days: w.days,
    costPerUser: w.cost_per_user ? Number(w.cost_per_user) : null,
    currency: w.currency,
    maxParticipants: w.max_participants,
    cityOrRemote: w.city_or_remote,
    program: w.program,
    isActive: w.is_active,
    order: w.order,
    isFeatured: w.is_featured,
    level: w.level,
    createdAt: w.created_at.toISOString(),
    updatedAt: w.updated_at.toISOString(),
  }));
};

export const getWorkshopByIdFull = async (id: number): Promise<Workshop | null> => {
  if (!id) {
    throw new Error('Workshop ID is required');
  }

  const workshop = await db
    .selectFrom('workshops')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  if (!workshop) {
    return null;
  }

  return {
    id: workshop.id,
    name: workshop.name,
    slug: workshop.slug,
    description: workshop.description,
    longDescription: workshop.long_description,
    days: workshop.days,
    costPerUser: workshop.cost_per_user ? Number(workshop.cost_per_user) : null,
    currency: workshop.currency,
    maxParticipants: workshop.max_participants,
    cityOrRemote: workshop.city_or_remote,
    program: workshop.program,
    isActive: workshop.is_active,
    order: workshop.order,
    isFeatured: workshop.is_featured,
    level: workshop.level,
    createdAt: workshop.created_at.toISOString(),
    updatedAt: workshop.updated_at.toISOString(),
  };
};
