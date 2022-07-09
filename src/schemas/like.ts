import { User } from "./user";
import {
  getModelForClass,
  prop,
  Ref,
  ModelOptions,
} from "@typegoose/typegoose";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class Like {
  @prop({ required: true, unique: true })
  id?: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const like = getModelForClass(Like);

export { Like, like };
