import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import NavBar from "./NavBar";

const Products = () => {
  const [quantities, setQuantities] = useState({});

  const [datas, setDatas] = useState([]);

  const handleQtyChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + change,
    }));
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:7000/api/products/get-products"
        );
        setDatas(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (ProductId, quantity) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/products/add-to-cart",
        { product: ProductId, quantity }
      );

      window.alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-[3%]">
      <NavBar />
      <div className="grid grid-cols-4 max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-8">
        {datas &&
          datas.map((product) => (
            <div
              key={product._id}
              className="font-gorditaMedium leading-[33px] shadow-lg p-[3%] rounded-md"
            >
              <img
                className="h-[400px] object-cover w-full"
                src={product.imageUrl}
                alt={product.name}
              />
              <h3 className="font-gorditaBold capitalize">{product.name}</h3>
              <h2>Stock: {product.stock}</h2>
              <h3>₹ {product.price}-/</h3>
              <div className="flex items-center justify-between ">
                <h2>Quantity:</h2>
                <div className="flex items-center">
                  <div className="py-[2px] px-[20px] bg-[#EBF5FF] font-gorditaRegular">
                    <h3>{quantities[product._id] || 1}</h3>
                  </div>
                  <div className="grid grid-rows-2 gap-y-[3%] h-full">
                    <div
                      onClick={() => handleQtyChange(product._id, 1)}
                      className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
                    >
                      <FontAwesomeIcon
                        icon={faAngleUp}
                        className="h-[18px] text-white "
                      />
                    </div>

                    <div
                      onClick={() => handleQtyChange(product._id, -1)}
                      className="bg-[#94C4F7] w-[27px]  flex justify-center items-center"
                    >
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="h-[18px] text-white "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  addToCart(product._id, quantities[product._id] || 1)
                }
                className="bg-[#94C4F7] text-white rounded-md text-[15px] w-full mt-[20px] font-gorditaBold px-[2%] py-[1%]"
              >
                ADD TO CART
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
