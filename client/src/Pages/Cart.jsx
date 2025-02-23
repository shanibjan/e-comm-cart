import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import NavBar from "../Components/NavBar";

const Cart = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productsForOrder, setProductsForOrder] = useState([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:7000/api/products/get-cart"
      );
      setDatas(data);
    } catch (error) {
      setError("Failed to fetch cart data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const filteredProducts = datas.map(({ product, quantity }) => {
      const { stock, ...filteredProduct } = product;
      return { ...filteredProduct, quantity };
    });

    setProductsForOrder(filteredProducts);
  }, [datas]);

  let total = 0;

  const updateCart = async (quantity, sign, cartId) => {
    try {
      const newQuantity = sign === "+" ? quantity + 1 : quantity - 1 || 1;

      await axios.put(
        `http://localhost:7000/api/products/update-cart/${cartId}`,
        { quantity: newQuantity }
      );

      setDatas((prevDatas) =>
        prevDatas.map((item) =>
          item._id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      await axios.delete(
        `http://localhost:7000/api/products/delete-cart/${cartId}`
      );
      setDatas((prevData) => prevData.filter((item) => item._id !== cartId));
    } catch (error) {
      console.log(error);
    }
  };
  const processPayment = async () => {
    try {
      const { data: order } = await axios.post(
        "http://localhost:7000/api/payment/create-payment",
        {
          amount: (total + 50) * 100, // e.g., 50000 paise = ₹500
        }
      );
      console.log(order);
      const options = {
        key: "rzp_test_VYT3qiUFj68Unw",
        amount: order.amount,
        currency: order.currency,
        name: "E-commerce",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          setTimeout(() => {
            placeOrder();
          }, 1000);
        },
        prefill: {
          name: "Shanib Jan",
          email: "shanibjan369@gmail.com",
          contact: "8129311392",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#94C4F7",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {}
  };
  const placeOrder = async () => {
    try {
      setOrderLoading(true);

      const orderData = {
        products: productsForOrder,
        bill: total,
      };

      await axios.post(
        "http://localhost:7000/api/products/create-order",
        orderData
      );

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading)
    return <p className="text-center font-gorditaMedium">Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="p-[3%]">
      <NavBar />
      <h1 className="text-[40px] text-[#244262] font-gorditaBold text-center">
        Cart
      </h1>
      {datas.length > 0 ? (
        <div>
          <div className="px-[10%] py-[5%]">
            <div>
              <div className="flex justify-between text-left py-[1%] text-[20px] max-[550px]:text-[15px] font-gorditaMedium text-[#244262] items-center ">
                <div className="w-[5%]"></div>
                <div className="w-[10%] max-[550px]:hidden"></div>
                <div className="w-[25%]">
                  <h1>Product</h1>
                </div>
                <div className="w-[20%] max-[550px]:hidden">
                  <h1>Price</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Quantity</h1>
                </div>
                <div className="w-[20%]">
                  <h1>Subtotal</h1>
                </div>
              </div>

              {datas.map((items) => {
                const price = items.product.price * items.quantity;
                total += price;
                return (
                  <div
                    key={items._id}
                    className="flex  overflow-hidden justify-between text-left py-[1%] text-[16px] max-[550px]:text-[13px] font-gordita text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px]"
                  >
                    <div className="w-[5%]">
                      <div
                        onClick={() => deleteCart(items._id)}
                        className=" cursor-pointer h-[100px] max-[550px]:h-[55px] flex justify-center items-center"
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="h-[28%] text-[#244262] "
                        />
                      </div>
                    </div>
                    <div className="w-[10%] p-[1%] max-[550px]:hidden">
                      <img
                        className="max-[550px]:hidden"
                        src={items.product.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="w-[25%]">
                      <h1>{items.product.name}</h1>
                    </div>
                    <div className="w-[20%] max-[550px]:hidden">
                      <h1>₹{items.product.price}</h1>
                    </div>
                    <div className="w-[20%]">
                      <div className="flex items-center h-[54px] max-[550px]:h-[43px] max-[400px]:h-[39px] ">
                        <div className="py-[15px] px-[25px] max-[550px]:py-[12px] max-[550px]:px-[20px] max-[400px]:py-[10px] max-[400px]:px-[15px] bg-[#EBF5FF] font-gorditaRegular">
                          <h3>{items.quantity}</h3>
                        </div>
                        <div className="grid grid-rows-2 gap-y-[3%] h-full">
                          <div
                            onClick={() =>
                              updateCart(items.quantity, "+", items._id)
                            }
                            className="bg-[#94C4F7] w-[27px] max-[550px]:w-[20px] max-[400px]:w-[16px]  flex justify-center items-center"
                          >
                            <FontAwesomeIcon
                              icon={faAngleUp}
                              className="h-[13px] text-white "
                            />
                          </div>
                          <div
                            onClick={() =>
                              updateCart(items.quantity, "-", items._id)
                            }
                            className="bg-[#94C4F7] w-[27px] max-[550px]:w-[20px] max-[400px]:w-[16px]  flex justify-center items-center"
                          >
                            <FontAwesomeIcon
                              icon={faAngleDown}
                              className="h-[13px] text-white "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[20%]">
                      <h1>₹{price}</h1>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <h1 className="font-gorditaBold text-[30px] max-[600px]:text-[25px] text-left text-[#244262] my-[3%]">
                Cart Totals
              </h1>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px]">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-gorditaMedium text-[#244262]  ">
                  Subtotal
                </h4>
                <h5 className="w-[70%] font-gorditaMedium ">₹{total}</h5>
              </div>

              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px] ">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-gorditaMedium text-[#244262] ">
                  Delivery charge
                </h4>
                <h5 className="w-[70%] font-gorditaMedium ">₹50</h5>
              </div>
              <div className="flex text-left border-b-[1px] border-b-gray-200 py-[2%] text-[18px] max-[600px]:text-[15px] max-[400px]:text-[12px] ">
                <h4 className="w-[30%] max-[550px]:w-[50%] font-gorditaMedium text-[#244262] ">
                  Total
                </h4>
                <h5 className="w-[70%] font-gorditaMedium ">₹{total + 50}</h5>
              </div>
              <button
                onClick={processPayment}
                disabled={orderLoading}
                className="bg-[#94C4F7] py-[2%] px-[3%] max-[550px]:py-[5%] max-[550px]:px-[7%] my-[2%] font-gorditaBold text-[12px] tracking-[2px]  text-white"
              >
                {orderLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-[30px] text-[#244262] text-center font-gorditaMedium mt-[50px]">
          No items in Cart
        </h1>
      )}
    </div>
  );
};

export default Cart;
