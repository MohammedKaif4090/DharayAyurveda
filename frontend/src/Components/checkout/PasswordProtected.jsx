import React, { useState } from 'react';

const PasswordProtected = ({ children }) => {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // WARNING: Do not store sensitive passwords on the client!
  const adminPassword = "dharay123"; // Replace with your admin password (not secure)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAuthorized(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  // If authorized, render children (protected content)
  if (authorized) {
    return <>{children}</>;
  }

  // Otherwise, render the password form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Enter Admin Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-4"
          placeholder="Password"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordProtected;
