import { drizzle } from 'drizzle-orm/d1';
import * as authSchemas from '~/db/schemas/auth';
export const db = drizzle(process.env.DB, { schema: { ...authSchemas } });
