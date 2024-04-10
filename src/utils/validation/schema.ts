import { z } from 'zod';

const AppSchema = z.object({
  port: z.number(),
  nodenv: z.string(),
});

const DbSchema = z.object({
  name: z.string(),
  host: z.string(),
  password: z.string(),
  username: z.string(),
  driver: z.string(),
  port: z.number({ required_error: 'port is required' }),
});

export const ConfigSchema = z.object({
  app: AppSchema,
  db: DbSchema,
});
