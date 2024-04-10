import * as path from 'path';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { validate } from './validation';
import { ConfigSchema } from './validation/schema';

export const loadYamlFile = <T>(f: string): T => {
  const fileName = `${process.env.NODENV ?? 'development'}.yaml`;
  const envFile = path.join(process.cwd(), '/src/', f, fileName);
  const obj = yaml.load(readFileSync(envFile, 'utf-8'));

  return validate(ConfigSchema, obj) as T;
};
