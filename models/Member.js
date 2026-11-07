import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  {
    collection: "members",
    versionKey: false
  }
);

export const Member = mongoose.model("Member", memberSchema);
