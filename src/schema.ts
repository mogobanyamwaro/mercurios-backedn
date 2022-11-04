const schema = `
type Query {
    post(id: ID!): Post!
    posts: [Post]!
    notifications: [Notification]!
}
type Notification {
    id: ID
    message: String!
}
type Mutation {
    createPost(data: CreatePostInput!): Post!
    addNotification(data:String! ): Notification!
}

type Subscription {
    notificationAdded: Notification!
}

type Post {
    id: ID!
    title: String!
    body: String!
    category: String!
    published: Boolean!
}
input CreateNotificationInput{
    message:String!
    id:ID
}

input CreatePostInput {
    id: ID
    title: String!
    body: String!
    category: String!
    published: Boolean!
}


`;
export default schema;
