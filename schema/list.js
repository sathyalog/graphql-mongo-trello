const listTypeDefs = `type List {
    id: String
    listName: String
    }
    type Query {
        lists:[List]
        list(id:String):List
    }
    type Mutation {
        addList(listName:String!):List
        deleteList(id:String!):List
        updateList(id:String!,listName:String!):List
    }
`; 

export default listTypeDefs;