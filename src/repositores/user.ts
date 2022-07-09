import { Types } from "mongoose";
import { User, user } from "../schemas/user";
import { IRepository } from "../typings/IRepository";

const objectId = (id) => new Types.ObjectId(id);

class userRepository implements IRepository<User> {
  async findAll(): Promise<User[]> {
    return await user.find();
  }

  async findById(id: string): Promise<User> {
    return await user.findById(objectId(id));
  }

  async create(entity: User): Promise<User> {
    return await user.create(entity);
  }

  async update(id: string, entity: User): Promise<User> {
    return user.findByIdAndUpdate(objectId(id), entity);
  }

  async delete(id: string): Promise<User> {
    return user.findByIdAndDelete(objectId(id));
  }

  async findByUsername(username: string): Promise<User> {
    return user.findOne({ username });
  }
}

export default new userRepository();
