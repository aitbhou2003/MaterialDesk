import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    equipmentId: { type: String, ref: "Equipment", default: null },
    status: {
      type: String,
      enum: ["DONE", "IN_PROGRESS"],
      required: true
    },
    performedAt: { type: Date, default: null },
    costCents: { type: Number, required: true }
  },
  {
    collection: "maintenance",
    versionKey: false
  }
);

export const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
