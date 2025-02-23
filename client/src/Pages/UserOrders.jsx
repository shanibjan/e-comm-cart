import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:7000/api/products/user-orders"
      );
      setOrders(data);
    } catch (error) {
      setError("Failed to fetch cart data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  

  if (loading)
    return <p className="text-center font-gorditaMedium">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-[3%]" >
      <NavBar/>
      <h1 className="font-gorditaBold text-center text-[#244262] text-[40px]  max-[550px]:text-[30px] max-[370px]:text-[25px]  my-[2%]">
        Orders
      </h1>

      {orders.length > 0 ? (
        <div className="px-[3%]">
          <div>
            <div>
              <div>
                {orders.map((items, index) => {
                  return (
                    <div  key={index} >
                      <div className="flex justify-between text-left py-[1%] text-[20px] max-[550px]:text-[15px] max-[470px]:text-[13px] font-gorditaMedium text-[#244262] items-center ">
                        <div className="w-[5%] max-[550px]:w-[2%]"></div>
                        <div className="w-[10%] max-[550px]:hidden"></div>
                        <div className="w-[25%]">
                          <h1>Product</h1>
                        </div>
                        <div className="w-[20%]">
                          <h1>Price</h1>
                        </div>
                        <div className="w-[20%]">
                          <h1>Quantity</h1>
                        </div>
                      </div>
                      <div
                       
                        className=" border-[1px] border-gray-300 shadow-lg mb-[4%]"
                      >
                        <h1 className="text-left font-gorditaBold text-[#244262] text-[30px] max-[550px]:text-[20px] p-[2%]">
                          Order No:{index + 1}
                        </h1>

                        {items.products.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className="flex overflow-hidden justify-between text-left py-[1%] text-[16px] max-[550px]:text-[13px] max-[470px]:text-[12px] font-gordita text-[#244262] items-center border-y-[1px] border-y-gray-300 h-[115px] max-[550px]:h-[65px]"
                            >
                              <div className="w-[5%] max-[550px]:w-[2%]"></div>
                              <div className="w-[10%] p-[1%] max-[550px]:hidden">
                                <img src={item.imageUrl} alt="" />
                              </div>
                              <div className="w-[25%] capitalize">
                                <h1>{item.name}</h1>
                              </div>
                              <div className="w-[20%]">
                                <h1>₹{item.price * item.quantity}</h1>
                              </div>
                              <div className="w-[20%]">
                                <div className="flex items-center h-[54px] ">
                                  <div className="py-[15px] px-[25px] max-[550px]:py-[12px] max-[550px]:px-[20px] max-[400px]:py-[10px] max-[400px]:px-[15px] bg-[#EBF5FF] font-gorditaRegular">
                                    <h3>{item.quantity}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="flex justify-end font-gorditaMedium mx-[5%] my-[2%] max-[550px]:text-[12px] max-[400px]:text-[10px] max-[500px]:block  ">
                          <div>
                            <h2>Total bill: ₹{items.bill} /-</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) :  (
        <h1 className="text-[30px] text-center text-[#244262] font-gorditaMedium mt-[50px]">
          No orders yet ...
        </h1>
      )}
    </div>
  );
};

export default UserOrders;
