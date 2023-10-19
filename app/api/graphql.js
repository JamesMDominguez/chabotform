import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from './typeDefs';
import mongoose from 'mongoose';

let db = undefined;

const isConnected = async () => {
    if(db == undefined){
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    db = mongoose.connection.db;
    }
  };
  
const resolvers = {
    Query: {
        getUser: async (_, { username }) => {
            await isConnected()
            return await db.collection('User').findOne({ name: username });
        },
        getSchedules: async () => {
            await isConnected()
            return await db.collection('Schedule').find().toArray();
        },
    },
    Mutation: {
        createUser: async (_, args) => {
            await isConnected()
            const data = await db.collection('User').insertOne(args);
            return data.acknowledged
        },
        createSchedule: async (_, args) => {
            await isConnected()
            const data = await db.collection('Schedule').insertOne(args);
            return data.acknowledged
        },
        updateUser: async (_, args) => {
            await isConnected()
            const data = await db.collection('User').updateOne({_id: args.id}, {$set: args})
            return data.acknowledged
        },
        deleteUser: async (_, {ownerEmail}) => {
            await isConnected()
            const data = await db.collection('User').deleteOne({ownerEmail: ownerEmail})
            return data.acknowledged
        }
    }  
};

const server = new ApolloServer({
  resolvers,
  typeDefs
});

export default startServerAndCreateNextHandler(server);