import { createSchema, createYoga } from "https://cdn.skypack.dev/graphql-yoga@3.9.1?dts"
import { serve } from "https://deno.land/std@0.176.0/http/server.ts"

console.log("Loading Wasm resolvers...")
import { instantiate } from "./wasm/resolvers.generated.js"
const { Query, Mutation } = await instantiate()

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      username(id: ID!): String!
    }
    type Mutation {
      counter: Int!
    }
  `,
  resolvers: {
    Query: {
      username: Query.username,
    },
    Mutation: {
      counter: Mutation.counter,
    },
  },
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  graphiql: true,
  landingPage: false,
})

serve(yoga, {
  onListen({ hostname, port }) {
    console.log(`Listening on http://${hostname}:${port}`)
  },
})
