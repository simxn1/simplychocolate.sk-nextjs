const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    paymentId: {
      type: Number,
    },
    paymentStatus: {
      type: String,
    },
    orderDetails: {
      type: Object,
    },
    paymentToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Order =
  mongoose.models["Order"] || mongoose.model("Order", orderSchema);
