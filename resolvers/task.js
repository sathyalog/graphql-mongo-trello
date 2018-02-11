import mongoose from 'mongoose';
import taskModel from '../models/task.js'

// define resolvers using query.resolvers will go and fetch your data from data store or database using queries
//Note: query should be exactly with typedef defined in schema.js
const taskResolvers = {
    Query: {
        tasks:() => {
            return taskModel.find({})
        },
       task: (root,{id}) => {
            return taskModel.findOne({id:id})
       },
       taskByList:(root,{listName}) => {
            return taskModel.find({listName:listName})
       }
    },
    Mutation:{
        addTask: (root,{text,listName}) => {
         const task = new taskModel({
             text:text,
             listName:listName
         });
         return task.save();
        },
        // delete an author using id
        deleteTask:(root,{id}) => {
            return taskModel.findOneAndRemove({id:id})
        },
        // we would like to update name of author using id
        updateTask:(root,{id,text}) => {
            return taskModel.findOneAndUpdate({id:id},{text:text});
        }
    }
}

export default taskResolvers;