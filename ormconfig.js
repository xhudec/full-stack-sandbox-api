/* eslint-disable @typescript-eslint/no-require-imports */
'use strict'

// eslint-disable-next-line
const config = require('./lib/config').default

const migrationsDirectoryPath = 'src/database/migrations'

module.exports = {
  name: 'default',
  type: 'postgres',
  host: config.database.postgres.host,
  port: config.database.postgres.port,
  username: config.database.postgres.username,
  password: config.database.postgres.password,
  database: config.database.postgres.database,
  synchronize: config.database.postgres.synchronize,
  logging: config.database.postgres.enableLogs,
  dropSchema: config.database.postgres.dropSchema,
  migrationTableName: 'migration_table',
  migrations: [`${migrationsDirectoryPath}/*.ts`],
  cli: {
    migrationsDir: migrationsDirectoryPath,
  },
  entities: ['src/database/entities/**{.js,.ts}'],
}
