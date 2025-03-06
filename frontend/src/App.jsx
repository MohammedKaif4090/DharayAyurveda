import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import ProductDetail from "./Components/ProductDisplay/ProductDetail";
import Cart from "./Components/Context/Cart";
import { CartProvider } from "./Components/Context/CartContext";
import Footer from "./Components/Footer/Footer";
import CustomerDetails from "./Components/checkout/CustomerDetails";
import PasswordProtected from "./Components/checkout/PasswordProtected"
const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/customers"
          element={
            <PasswordProtected>
              <CustomerDetails />
            </PasswordProtected>
          }
        />
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
