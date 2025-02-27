import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import ProductDetail from "./Components/ProductDisplay/ProductDetail";
import Cart from "./Components/Context/Cart";
import { CartProvider } from "./Components/Context/CartContext";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Loginpage/Login";
import CheckoutForm from "./Components/checkout/CheckoutForm"


const App = () => {
  return (
    <CartProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/checkout" element={<CheckoutForm isAdmin={true} />} />

        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider>
  );
};

export default App;

