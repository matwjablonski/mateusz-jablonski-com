import { Kysely } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';
import { Database } from './schema';

const connectionString = process.env.POSTGRES_URL || '';

const postgresClient = postgres(connectionString);

export const db = new Kysely<Database>({
  dialect: new PostgresJSDialect({
    postgres: postgresClient,
  }),
});
