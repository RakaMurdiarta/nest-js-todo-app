import { Inject, Injectable } from '@nestjs/common';
import { loadYamlFile } from 'src/utils/read.yaml';
import { IConfig } from 'src/config/interface/config.interface';

@Injectable()
export class ConfigService {
  env: IConfig;
  constructor(@Inject('CONFIG') private readonly path: { folder: string }) {
    this.env = this.storeEnv();
  }

  storeEnv(): IConfig {
    return loadYamlFile<IConfig>(this.path.folder);
  }
}
