const express = require('express')
const app = express()
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

const userData = [
    {id:1, firstName: 'marco', lastName: 'magnani', email: "marco@gmail.com"},
    {id:2, firstName: 'ricco', lastName: 'paolo', email: "paolo@gmail.com"},
    {id:3, firstName: 'sara', lastName: 'bertazzi', email: "sara@gmail.com"},
    {id:4, firstName: 'angelo', lastName: 'mani', email: "angelo@gmail.com"}
]

const userType = new GraphQLObjectType({
    name: 'user',
    fileds: () => ({
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(userType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args) {
                return userData
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'mutation', 
    fields: {
        createUser: {
            type: userType,
            args: {
                firstName:{type: GraphQLString},
                lastName: {type: GraphQLString},
                email: {type: GraphQLString}
            },
            resolve(parent, args) {
                userData.push({id: userData.length + 1,
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email
            })
            return args
            }
        }
    }
})
const schema = new GraphQLSchema({query:RootQuery , mutation:Mutation })

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))


app.listen(6868, () => console.log('server running'))