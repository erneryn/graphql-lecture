const {ApolloServer, gql, makeExecutableSchema, AuthenticationError} = require('apollo-server')
const client = require('./services/mongo')
const BookSchema = require('./schemas/book')

const typeDefs = gql`
  type Query

  type Mutation

  type User {
    name: String
    age: Int
  }
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, BookSchema.typeDefs],
  resolvers: [BookSchema.resolvers]
})

const server = new ApolloServer({
  schema,
  async context({req}) {
    console.log({req})

    if (req.headers.token === 'asd') {
      throw new AuthenticationError('Error gan')
    }
    await client.connect()
    const db = client.db('majestic-fox')

    return {
      db
    }
  }
})

server.listen(4000).then(async () => {
  console.log('Server url at 4000')
})
