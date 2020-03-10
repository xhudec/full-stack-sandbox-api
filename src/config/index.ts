// TODO: create an utility fn for Environment Variable extraction
/* eslint-disable no-process-env */
import { config as configureDotEnv } from 'dotenv'
import path from 'path'

const nodeEnvironment = process.env.NODE_ENV ?? 'development'

configureDotEnv({ path: path.resolve(process.cwd(), `${nodeEnvironment}.env`) })

const isDevelopmentEnvironment = nodeEnvironment === 'development'
const isTestEnvironment = nodeEnvironment === 'test'

const config = {
  server: {
    port: Number(process.env.PORT ?? '4000'),
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      enableLogs: isDevelopmentEnvironment,
      synchronize: isTestEnvironment,
      dropSchema: isTestEnvironment,
    },
  },
}

export default config
