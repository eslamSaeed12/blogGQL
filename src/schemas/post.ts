import { Types } from "mongoose";
import { Comment } from "./comment";
import { Like } from "./like";
import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class Post {
  _id?: Types.ObjectId;

  @prop({ required: true, unique: true })
  title?: string;

  @prop({ required: true })
  content?: string;

  @prop({ default: [] })
  comments?: Types.Array<Comment>;

  @prop({ default: [] })
  likes?: Types.Array<Like>;
}

const post = getModelForClass(Post);

export { Post, post };
