import mongoose from 'mongoose';
import UUID from 'node-uuid';

const schema = mongoose.Schema;

const taskSchema = new schema({
    //name,age,book and id
    id: {type:String,default:UUID.v1},
    text: String,
    listName: String
});

const taskModel = mongoose.model('task',taskSchema);

export default taskModel;