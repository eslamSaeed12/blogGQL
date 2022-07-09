import { getModelForClass, prop, ModelOptions } from "@typegoose/typegoose";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class Notfication {
  @prop({ required: true, unique: true })
  content: string;

  @prop({ default: false })
  viewed: boolean;
}

const notfication = getModelForClass(Notfication);

export { Notfication, notfication };
