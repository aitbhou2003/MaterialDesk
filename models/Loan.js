import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    memberId: { type: String, ref: "Member", required: true },
    equipmentId: { type: String, ref: "Equipment", required: true },
    status: {
      type: String,
      enum: ["RETURNED", "ACTIVE", "CANCELLED"],
      required: true
    },
    startedAt: { type: Date, required: true },
    returnedAt: { type: Date, default: null },
    durationDays: { type: Number, required: true },
    feeCents: { type: Number, required: true }
  },
  {
    collection: "loans",
    versionKey: false
  }
);

export const Loan = mongoose.model("Loan", loanSchema);
