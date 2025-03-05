import React, { useEffect, useState } from "react";

const CustomerDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold mb-4">Customer Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-6 p-4 border rounded shadow">
            <h2 className="text-2xl font-semibold">{order.name}</h2>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Contact:</strong> {order.contact}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}
            </p>
            <h3 className="text-xl mt-2">Cart Items:</h3>
            {order.cartItems && order.cartItems.length > 0 ? (
              <ul className="list-disc ml-6">
                {order.cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} — Quantity: {item.quantity} — Price: {item.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in order.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDetails;
