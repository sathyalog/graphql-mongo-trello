import mongoose from 'mongoose';
import UUID from 'node-uuid';

const schema = mongoose.Schema;

const listSchema = new schema({
    id: {type:String,default:UUID.v1},
    listName: String
});

const listModel = mongoose.model('list',listSchema);

export default listModel;