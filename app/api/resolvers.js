import { gql } from 'graphql-tag';

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String! 
    profile_image: String!
}

type Schedule{
    times: [String!]!
    name: String!
    semYear: String!
    ICA: [[String]]
    comment: String
    aproval: String
}

type Query {
  getUser(username: String!): User
  getSchedules():[Schedule]
}

type Mutation {
  createSchedule(times:[String],name:String,semYear: String,ICA: [[String]],comment: String,aproval: String): Boolean!
  createUser(name: String!,email: String!,profile_image: String!): Boolean!
  updateUser(email:String): Boolean!
  deleteUser(email:String): Boolean!
}
`;
export default typeDefs;