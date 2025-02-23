import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    bill: {
      type: Number,
      require: true,
    },

    products: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
