import express from 'express';
import {graphqlExpress,graphiqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import taskTypeDefs from './schema/task.js';
import listTypeDefs from './schema/list.js';
import taskResolvers from './resolvers/task.js';
import listResolvers from './resolvers/list.js';
import mongoose from 'mongoose';
import {makeExecutableSchema, mergeSchemas} from 'graphql-tools';

const server = express();

server.use('/graphiql', graphiqlExpress({
    endpointURL:'/graphql'
}));

//connect to mongodb
mongoose.connect('mongodb://localhost/graphqlTrello');

const connection = mongoose.connection;

//define resolver object with queries and mutations of your resolvers
const resolver = {
    Query: Object.assign({}, taskResolvers.Query, listResolvers.Query),
    Mutation: Object.assign({},taskResolvers.Mutation, listResolvers.Mutation)
    
}

//To add the ability to navigate between types, you need to extend existing types with fields that can take you from one to the other. 
const linkTypeDefs = `
  extend type List {
    task: Task
  }

  extend type Task {
    list: List
  }
`;

//merging schemas with typedefs and resolvers
const schema = mergeSchemas({
    schemas: [listTypeDefs, taskTypeDefs, linkTypeDefs],
    resolvers: mergeInfo => (
        { Query: resolver.Query, Mutation: resolver.Mutation  }
    )
});

//establish mongoconnection
connection.once('open',()=>{
    console.log('connection to Mongodb was successful')
})

server.use('/graphql',bodyParser.json(),graphqlExpress({
    schema
}))

server.listen(5600,() => {
    console.log('listening on port 5600')
})