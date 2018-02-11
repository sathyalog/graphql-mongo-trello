import mongoose from 'mongoose';
import UUID from 'node-uuid';

const schema = mongoose.Schema;

const taskSchema = new schema({
    id: {type:String,default:UUID.v1},
    text: String,
    listName: String
});

//define mongo collection
const taskModel = mongoose.model('task',taskSchema);

export default taskModel;