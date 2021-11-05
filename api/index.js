const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// Database
const db = require('./models/index')
// GraphQL
const graphqlHTTP = require('express-graphql')
const Schema = require('./graphql/schema')
const SchemaResolver = require('./graphql/resolvers')

// Create express instance
const app = express()

// Plugins
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

// Require API routes

// Import API Routes
app.use('/users', require('./routes/users'))
app.use('/property', require('./routes/property'))
app.use('/graphql', graphqlHTTP(() => ({
  schema: Schema,
  context: {db: db, conn: db.sequelize, str: 'String of Instance'},
  rootValue: SchemaResolver,
  graphiql: true
})))

db
  .sequelize
  .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
