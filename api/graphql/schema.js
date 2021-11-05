const fs = require('fs')
const path = require('path')
const {buildSchema } = require('graphql')

const schemaLocation = './api/graphql/schema.graphql'
const schemaString = fs.readFileSync(path.resolve(schemaLocation))
const schema = buildSchema(`${schemaString.toString()}`)

module.exports = schema
