const local = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: ['query'],
  synchronize: false,
  entities: ['dist/entity/index.js'],
  subscribers: ['dist/subscriber/*.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  maxQueryExecutionTime: 1000,
};

if (process.env.NODE_ENV !== 'production') {
  local.ssl = false;
}

/**
 * Due to some wonkiness from webpack, we need to separate where the CLI calls and the server itself goes to look for entities, migrations and subscribers
 * For Server: Because the server is running the index.js created by webpack, we cannot reference the .ts files directly, and instead reference the files in dist
 * for CLI: using ts-node, we can directly reference the various folders through their .ts folders
 */

/**
 * Note: reject Unauthorized is related to some changes in pg 8.0 where they made SSL opt out instead of optt in
 * https://github.com/brianc/node-postgres/issues/2009
 */

//  TODO: figure out if this is the best way

// Note: This should be opposite for running against higher envs from locally (should be !== for dev/prod when local)
const sslConfig =
  process.env.NODE_ENV !== 'production'
    ? {
        rejectUnauthorized: false,
      }
    : undefined;

const cli = Object.assign({}, local, {
  name: 'cli',
  entities: ['src/entity/index.ts'],
  subscribers: ['src/subscriber/*.ts'],
  migrations: ['src/migration/*.ts'],
});
const seed = Object.assign({}, local, cli, {
  name: 'seed',
  logging: ['error'],
  migrations: ['src/seedData/*.ts'],
  ssl: sslConfig,
});
const migration = Object.assign({}, local, {
  name: 'migration',
  entities: ['src/entity/index.ts'],
  subscribers: ['src/subscriber/*.ts'],
  migrations: ['src/migration/*.ts'],
  ssl: sslConfig,
});

const prod = Object.assign({}, local, {
  name: 'production',
  logging: ['query'],
  ssl: sslConfig,
});
const prodCLI = Object.assign({}, cli, {
  name: 'prod-cli',
  logging: ['error'],
  ssl: sslConfig,
});

module.exports = [local, cli, seed, migration, prod, prodCLI];


export function getORMConfig(): ConnectionOptions {
  const configs: ConnectionOptions[] = require('../ormconfig.js');

  if (!configs.length) {
    throw new Error('Missing Configuration Files.');
  }
  let config: ConnectionOptions;
  switch (getAppConfig().APP_ENV) {
    case 'dev':
    case 'prod': {
      config = configs.find((c) => c.name === 'production');
      getLogger().info('[SETUP] Using production ORM Config.');
      break;
    }
    default:
      config = configs.find((c) => c.name === 'default') || configs[0];
      getLogger().info('[SETUP] Using Default ORM Config.');
  }
  return config;
}
