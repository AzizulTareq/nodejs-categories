import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
  name: string;
  parent: Category | null;
  children: Category[];
  active: boolean;
}

const categorySchema = new Schema<Category>({
  name: { type: String, unique: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
  children: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  active: { type: Boolean, default: true },
});

export default mongoose.model<Category>("Category", categorySchema);
