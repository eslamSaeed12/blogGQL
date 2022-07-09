import { pubsub } from "../server";

export default {
  postAdded: {
    subscribe: () => pubsub.asyncIterator("postAdded"),
  },
  postUpdated: {
    subscribe: () => pubsub.asyncIterator("postUpdated"),
  },
  postDeleted: {
    subscribe: () => pubsub.asyncIterator("postDeleted"),
  },

  commentAdded: {
    subscribe: () => pubsub.asyncIterator("commentAdded"),
  },

  commentDeleted: {
    subscribe: () => pubsub.asyncIterator("commentDeleted"),
  },
};
