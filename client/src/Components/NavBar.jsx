import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const nav = useNavigate();
    const location = useLocation(); 
    const navigateTo = (path) => {
       
        
        nav(path);
      };

      const navToHome=()=>{
        nav('/')
      }
  return (
    <div>
      <div className="flex justify-between mb-[30px] max-[700px]:block">
        <h1 onClick={navToHome} className="font-gorditaMedium text-[35px] cursor-pointer">E-commerce</h1>
        <div className="w-[50%] flex justify-between max-[760px]:w-[60%] max-[700px]:w-full">
          {["/cart", "/add-product", "/orders"].map((path, index) => (
            <button
              key={index}
              onClick={() => navigateTo(path)}
              className={`bg-[#94C4F7] text-white rounded-md font-gorditaMedium max-[700px]:px-[5%] max-[700px]:py-[4%] max-[450px]:p-[2%] px-[2%] py-[1%] ${path===location.pathname?"hidden":""}`}
            >
              {path === "/cart"
                ? "Go to Cart"
                : path === "/add-product"
                ? "Add Products"
                : "Orders"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;