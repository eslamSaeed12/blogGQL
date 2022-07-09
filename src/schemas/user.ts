import { Types } from "mongoose";
import { Notfication } from "./notfication";
import { Post } from "./post";
import {
  getModelForClass,
  prop,
  pre,
  ModelOptions,
} from "@typegoose/typegoose";
import { hashSync } from "bcryptjs";
import { DocumentCT } from "../typings/document";

@pre<User>("save", function (next) {
  this.password = hashSync(this.password);
  next();
})
@ModelOptions({
  schemaOptions: {
    id: false,
    timestamps: true,
  },
})
class User {

  _id?:Types.ObjectId;

  @prop({ required: true, unique: true })
  username?: string;

  @prop({ required: true, unique: true })
  email?: string;

  @prop({ required: true })
  password?: string;

  @prop({ default: [] })
  posts?: Types.Array<Post>;

  @prop({ default: [] })
  notfications?: Types.Array<Notfication>;
}

const user = getModelForClass(User);

export { user, User };
