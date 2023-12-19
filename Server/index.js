import express from 'express';
import bodyParser  from 'body-parser';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import {expressMiddleware} from "@apollo/server/express4" ;
import axios from 'axios';
import users from './user.js';
import TODOS from './todo.js';

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
        type Users{
            id:ID!
            name:String!
            username:String!
            email:String!
            phone:String!
            website:String!
        }
            type Todo{
                id: ID!
                title:String!
                completed:Boolean
                user:Users
            }

            type User{
                id:ID!
            name:String!
            username:String!
            email:String!
            phone:String!
            website:String!
            }

            type Query{
                getTodos:[Todo]
                getUsers:[Users]
                getUser:User
            }
        `,
        resolvers:{
            Todo:{
                user:(todo) =>  users.find((e) =>  e.id === todo.id)
            },
            Query:{
                getTodos:() => TODOS,
                getUsers:() => users,
                getUser :(parent,{id}) => users.find((e) =>  e.id === id),
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql",expressMiddleware(server));

    app.listen("8000",() =>{
        console.log(`Port has started at 8000`)
    })
}

startServer()