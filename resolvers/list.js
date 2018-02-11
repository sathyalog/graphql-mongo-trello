import mongoose from 'mongoose';
import listModel from '../models/list.js'

// define resolvers using query.resolvers will go and fetch your data from data store or database using queries
//Note: query should be exactly with typedef defined in schema.js
const listResolvers = {
    Query: {
        lists:() => {
            return listModel.find({})
        },
       list: (root,{id}) => {
            return listModel.findOne({id:id})
       }
    },
    Mutation:{
        addList: (root,{listName,tasks}) => {
         const list = new listModel({
            listName:listName
         });
         return list.save();
        },
        // delete an author using id
        deleteList:(root,{id}) => {
            return listModel.findOneAndRemove({id:id})
        },
        // we would like to update name of author using id
        updateList:(root,{id,listName}) => {
            return listModel.findOneAndUpdate({id:id},{listName:listName});
        }
    }
}

export default listResolvers;