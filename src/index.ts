import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import './config/setup'
import config from './config'
import createDatabaseConnection from './database/database-connection'
import createGraphQLSchema from './graphql/create-schema'

const app = express()

async function main(): Promise<void> {
  await createDatabaseConnection()
  const schema = await createGraphQLSchema()

  console.log('[schema]', schema)

  const apolloServer = new ApolloServer({ schema, introspection: true, playground: true })

  apolloServer.applyMiddleware({ app })

  app.listen({ port: config.server.port }, () => {
    // eslint-disable-next-line no-console
    console.info(
      'ℹ️[API]',
      `🚀 Server ready at http://localhost:${config.server.port}${apolloServer.graphqlPath}`
    )
  })
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('🚨[API Error]', err)
})
