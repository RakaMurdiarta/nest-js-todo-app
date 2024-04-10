import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { loadYamlFile } from 'src/utils/read.yaml';
import { IConfig } from '../interface/config.interface';
import * as entities from 'src/entities/index';

const {
  db: { host, name, port, password, username },
} = loadYamlFile('config') as IConfig;

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: host,
    port,
    username,
    password,
    database: name,
    entities: Object.values(entities),
    logging: false,
  }),
);
