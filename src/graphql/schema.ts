import { gql } from "mercurius-codegen";

gql`
  type Query {
    post(id: ID!): Post!
    posts: [Post]!
    notifications: [Notification]!
    createPost(data: CreatePostInput!): Post!
  }
`;
