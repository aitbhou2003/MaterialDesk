import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    assetTag: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    archived: { type: Boolean, required: true }
  },
  {
    collection: "equipments",
    versionKey: false
  }
);

export const Equipment = mongoose.model("Equipment", equipmentSchema);
