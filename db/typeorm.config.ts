import { IConfig } from '../src/config/interface/config.interface';
import { DataSource } from 'typeorm';
import * as entities from '../src/entities/index';
import { loadYamlFile } from '../src/utils/read.yaml';

const configFile = loadYamlFile<IConfig>('config');

console.log(configFile);

export default new DataSource({
  type: 'postgres',
  host: configFile.db.host,
  port: configFile.db.port,
  username: configFile.db.username,
  password: configFile.db.password,
  database: configFile.db.name,
  entities: Object.values(entities),
  synchronize: false,
  logging: false,
  migrations: [`${process.cwd()}/db/migrations/*.ts`],
  migrationsTableName: 'migrations-histories',
});
