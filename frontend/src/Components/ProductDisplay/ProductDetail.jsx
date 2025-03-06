import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { CartContext } from "../Context/CartContext.jsx";
import products from "../../assets/product.js";
import ImageSlider from "../ProductDisplay/ImageSlider.jsx";
import Star from "../../assets/star_icon.png";
import Star_dull from "../../assets/star_dull_icon.png";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const [cartMessage, setCartMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!product)
    return (
      <h2 className="text-center text-2xl mt-10 text-red-500">
        Product not found!
      </h2>
    );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartMessage("Product added to cart!");

    // Redirect to cart page after a short delay
    setTimeout(() => {
      navigate("/cart");
    }, 1000); // Redirect after 1 second
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="md:w-1/2">
          <ImageSlider images={product.images} />
        </div>
       
        {/* Product Details & Add to Cart */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-700">
            Price:{" "}
            <span className="font-semibold">
              {product.price || "Contact for price"}/200gm
            </span>
          </p>
          <p className="mt-4 text-gray-600">{product.Description}</p>
          <div className="mt-6 flex items-center">
            <label htmlFor="quantity" className="mr-3 text-lg font-medium mb-4 mt-3">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-16 p-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-3.5 bg-green-200 text-black font-semibold py-2 px-6 rounded-xl hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
          {cartMessage && (
            <p className="mt-2 text-green-600 font-medium">{cartMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
