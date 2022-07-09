import { Post } from "../schemas/post";
import { User } from "../schemas/user";
import auth from "../services/auth";
import postRepository from "../repositores/post";
import commentRepository from "../repositores/comment";
import { pubsub } from "../server";

export default {
  register(_, { username, email, password }): Promise<User> {
    return auth.register({ username, email, password });
  },

  async addPost(_, { title, content }): Promise<Post> {
    const post_ = await postRepository.create({ title, content });
    pubsub.publish("postAdded", { postAdded: post_ });
    return post_;
  },

  async updatePost(_, { postId, title, content }): Promise<Post> {
    const updatedPost = await postRepository.update(postId, { title, content });
    pubsub.publish("postUpdated", { postUpdated: updatedPost });
    return updatedPost;
  },

  async deletePost(_, { postId }): Promise<Post> {
    const deletedPost = await postRepository.delete(postId);
    pubsub.publish("postDeleted", { postDeleted: deletedPost });
    return deletedPost;
  },

  async addComment(_, { content, postId, userId }) {
    const commt = await commentRepository.create(
      {
        content,
        user: {
          _id: userId,
        },
      },
      postId
    );

    pubsub.publish("commentAdded", { commentAdded: commt });

    return commt;
  },
  async updateComment(_, { content, userId, postId, commentId }) {
    const commt = await commentRepository.update(
      postId,
      commentId,
      userId,
      content
    );

    pubsub.publish("commentUpdated", { commentUpdated: commt });

    return commt;
  },

  async deleteComment(_, { commentId, postId, userId }) {
    const commt = await commentRepository.delete(postId, commentId);

    pubsub.publish("commentDeleted", { commentDeleted: commt });

    return commt;
  },
};
