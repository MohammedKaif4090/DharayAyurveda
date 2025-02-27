import { useState, useEffect } from "react";

const CheckoutForm = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 border p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Customer Details</h3>
      {customers.length === 0 ? (
        <p className="text-lg">No customer details available.</p>
      ) : (
        <ul className="space-y-4">
          {customers.map((customer, index) => (
            <li key={index} className="p-4 border rounded-md shadow">
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Address:</strong> {customer.address}</p>
              <p><strong>Contact:</strong> {customer.contact}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckoutForm;
