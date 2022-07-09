import { Types } from "mongoose";
import { Post, post } from "../schemas/post";
import { IRepository } from "../typings/IRepository";

const objectId = (id) => new Types.ObjectId(id);

class postRepository implements IRepository<Post> {
  async findAll(): Promise<Post[]> {
    return await post.find().lean();
  }

  async findById(id: string): Promise<Post> {
    return await post.findById(objectId(id));
  }

  async create({ title, content }: any): Promise<Post> {
    return await post.create({ title, content });
  }

  async update(id: string, entity: Post): Promise<Post> {
    return post.findByIdAndUpdate(objectId(id), entity);
  }

  async delete(id: string): Promise<Post> {
    return post.findByIdAndDelete(objectId(id));
  }
}

export default new postRepository();
