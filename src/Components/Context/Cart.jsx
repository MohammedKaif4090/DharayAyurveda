import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const navigate = useNavigate();

  // Debug: log current cart items
  console.log("Cart Items:", cartItems);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const numericPrice = Number(item.price.replace(/[^0-9.]+/g, ""));
    return total + numericPrice * item.quantity;
  }, 0);

  // Handle checkout submission with debug logs
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission triggered.");
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Contact:", contact);

    if (!/^[0-9]{10}$/.test(contact)) {
      setContactError("Contact number must be exactly 10 digits.");
      console.error("Contact validation failed. Provided contact:", contact);
      return;
    }
    setContactError("");

    // IMPORTANT: Use "cartItems" to match the server schema
    const orderData = {
      name,
      address,
      contact,
      cartItems: cartItems, // Updated field name here
      totalPrice,
    };

    console.log("Submitting order data:", orderData);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      
      console.log("Response status:", response.status);
      const responseBody = await response.json();
      console.log("Response body:", responseBody);

      if (response.ok) {
        console.log("Order submitted successfully!");
        setSubmitted(true);
        setCheckoutVisible(false);
        clearCart();
        navigate("/customers");
      } else {
        console.error("Failed to submit order:", responseBody);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="text-gray-600">
                      Price: <span className="font-medium">{item.price}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
            <h3 className="text-2xl font-bold">
              Total: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
            </h3>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                onClick={clearCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setCheckoutVisible(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Checkout Form */}
      {checkoutVisible && !submitted && (
        <div className="mt-10 border p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Checkout</h3>
          <form onSubmit={handleCheckoutSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-1">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-1">Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                pattern="[0-9]{10}"
                title="Contact number must be exactly 10 digits."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {contactError && (
                <p className="mt-1 text-red-500 text-sm">{contactError}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
