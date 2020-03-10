import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

export default async function createGraphQLSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [`${__dirname}/resolvers/*.*`],
  })
}
