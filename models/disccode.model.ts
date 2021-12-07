import mongoose from "mongoose";
const Schema = mongoose.Schema;

const discCodeSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const DiscCode =
  mongoose.models["DiscCode"] || mongoose.model("DiscCode", discCodeSchema);
