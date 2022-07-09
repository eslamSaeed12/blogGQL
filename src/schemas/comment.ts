import {
  getModelForClass,
  ModelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "./user";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class Comment {
  
  _id?: Types.ObjectId;

  @prop({ required: true, unique: true })
  content: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const comment = getModelForClass(Comment);

export { Comment, comment };
