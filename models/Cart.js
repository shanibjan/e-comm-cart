import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity:{
    type:Number,
    require:true,
  },
});



const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
