import { Types } from "mongoose";
import { Comment, comment } from "../schemas/comment";
import { IRepository } from "../typings/IRepository";
import { post } from "../schemas/post";

const objectId = (id) => new Types.ObjectId(id);

class commentRepository implements IRepository<Comment> {
  async findAll(): Promise<Comment[]> {
    return await comment.find();
  }

  async findById(id: string): Promise<Comment> {
    return await comment.findById(objectId(id));
  }

  async create(entity: Comment, postId: string): Promise<Comment> {
    const cmt = new comment(entity);

    const pst = await post.findByIdAndUpdate(objectId(postId));

    pst.comments.push(cmt);

    console.log(cmt);

    await pst.save();

    return cmt;
  }

  async update(
    postId: string,
    commentId: string,
    userId: string,
    content: string
  ): Promise<Comment> {
    console.log(postId, commentId, userId, content);

    const pst = await post.findOneAndUpdate(
      {
        _id: objectId(postId),
        "comments._id": objectId(commentId),
        "user._id": objectId(userId),
      },
      {
        $set: {
          "comments.$.content": content,
        },
      }
    );

    return pst.comments[pst.comments.length - 1];
  }

  async delete(postId: string, commentId: string): Promise<Comment> {
    return await post.findOneAndUpdate(
      {
        _id: objectId(postId),
      },
      {
        $pull: {
          comments: { _id: objectId(commentId) },
        },
      }
    );
  }
}

export default new commentRepository();
