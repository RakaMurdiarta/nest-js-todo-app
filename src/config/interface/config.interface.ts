export interface IConfig {
  app: {
    port: number;
    nodenv: string;
  };
  db: {
    name: string;
    host: string;
    password: string;
    username: string;
    driver: string;
    port: number;
  };
}
