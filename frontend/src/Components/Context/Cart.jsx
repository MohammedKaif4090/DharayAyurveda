import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext.jsx";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");

  const calculatePrice = (item) => {
    if (item.name.toLowerCase().includes("brush")) {
      const packsOfFive = Math.floor(item.quantity / 5);
      const remaining = item.quantity % 5;
      return packsOfFive * 200 + remaining * 52;
    }
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return numericPrice * item.quantity;
  };

  const totalPrice = cartItems.reduce((total, item) => total + calculatePrice(item), 0);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(contact)) {
      setContactError("Contact number must be exactly 10 digits.");
      return;
    }
    setContactError("");

    const orderData = { name, address, contact, cartItems, totalPrice };

    try {
      const response = await fetch("https://dharayayurved.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setSubmitted(true);
        clearCart();
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {submitted && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-green-600">Thank you for submitting the form!</h3>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ₹{calculatePrice(item)}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Remove</button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length === 0 && !submitted && <p className="text-xl">Your cart is empty.</p>}

      {cartItems.length > 0 && !submitted && (
        <form onSubmit={handleCheckoutSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block mb-1">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>

          <div>
            <label className="block mb-1">Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded" required />
          </div>

          <div>
            <label className="block mb-1">Contact Number:</label>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full p-2 border rounded" required />
            {contactError && <p className="text-red-500">{contactError}</p>}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-6">
            <h3 className="text-2xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h3>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button type="button" onClick={clearCart} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Clear Cart</button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Checkout</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Cart;
