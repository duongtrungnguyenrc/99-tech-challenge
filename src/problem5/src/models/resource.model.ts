import mongoose, { Document } from "mongoose";

export interface IResource extends Document {
  name: string;
  description: string;
  createdAt: Date;
}

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ResourceModel = mongoose.model<IResource>(
  "Resource",
  ResourceSchema
);
