import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/modules/drizzle/entities/*.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.POSTGRES_DB_CONNECTION_STRING ||
      'http://postgres:postgres@172.17.0.3:5432/',
  },
});
