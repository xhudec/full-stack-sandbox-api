import { createConnection, Connection } from 'typeorm'
import path from 'path'

import config from '../config'

export default async function createDatabaseConnection(): Promise<Connection> {
  return await createConnection({
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
    entities: [path.join(__dirname, '/entities/**{.js,.ts}')],
  })
}
