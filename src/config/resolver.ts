import Post from "./index";
import Notification from "./notification";
const resolvers = {
  Query: {
    posts: async (_: any, obj: any) => {
      const posts = await Post.find({});
      return posts;
    },
    post: async (_: any, obj: any) => {
      const { id } = obj;
      const post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      { data }: { data: any },
      { pubsub }: { pubsub: any }
    ) => {
      const newPost = new Post(data);
      const post = await newPost.save();
      //   create the notification and publish it
      const newNotification = new Notification({
        message: `New post created with title ${post.title} and body ${post.body}`,
      });
      const notification = await newNotification.save();
      console.log("douglad", notification);
      await pubsub.publish({
        topic: "NOTIFICATION_ADDED",
        payload: {
          notificationAdded: notification,
        },
      });
      return post;
    },
    addNotification: async (
      _: any,
      { data }: { data: any },
      { pubsub }: { pubsub: any }
    ) => {
      const newNotification = new Notification({ message: data });
      const notification = await newNotification.save();
      //   create the subscription
      await pubsub.publish({
        topic: "NOTIFICATION_ADDED",
        payload: {
          notificationAdded: notification,
        },
      });
      return notification;
    },
  },
  Subscription: {
    notificationAdded: {
      subscribe: async (_: any, __: any, { pubsub }: { pubsub: any }) => {
        return pubsub.subscribe("NOTIFICATION_ADDED");
      },
    },
  },
};
export default resolvers;
