const taskTypeDefs = `type Task {
    id: String
    text: String
    listName: String
    }
    type Query {
        tasks:[Task]
        task(id:String):Task
        taskByList(listName:String):[Task]
    }
    type Mutation {
        addTask(text:String!,listName:String!):Task
        deleteTask(id:String!):Task
        updateTask(id:String!,text:String!):Task
    }
`; 

export default taskTypeDefs;