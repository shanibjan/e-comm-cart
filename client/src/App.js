import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import AddProducts from "./Pages/AddProducts";
import UserOrders from "./Pages/UserOrders";


function App() {
  return (
   
      <Router>  
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/add-product" element={<AddProducts />} />
        <Route exact path="/orders" element={<UserOrders />} />
      </Routes>
    </Router>
   
    
  );
}

export default App;
