import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "./firebaseConfig"; // Adjust the import path as needed
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Handle email/password login (simulate async login for demonstration)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    setLoginError("");
    console.log("Email:", email, "Password:", password);
    try {
      // Simulate an asynchronous login (replace with your actual login logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // On successful login, redirect to a dashboard or home page
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Failed to login. Please try again.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // Handle Google login using Firebase Authentication
  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setLoginError("");
    console.log("Google login clicked");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google login successful:", user);
      // On successful login, redirect to your dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google login:", error);
      setLoginError("Google login failed. Please try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {loginError && (
          <div className="mb-4 text-center text-red-600">{loginError}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loadingEmail ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="flex items-center justify-center w-full p-2 border rounded hover:bg-gray-200"
          >
            <FcGoogle size={24} className="mr-2" />
            {loadingGoogle ? "Logging in..." : "Login with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
