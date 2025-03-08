import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext.jsx";
import products from "../../assets/product.js";
import ImageSlider from "../ProductDisplay/ImageSlider.jsx";
import Star from "../../assets/star_icon.png";
import Star_dull from "../../assets/star_dull_icon.png";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  const handleReviewSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please add a rating and comment.");
      return;
    }
    const newReview = { rating, comment };
    setReviews([...reviews, newReview]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <ImageSlider images={product.images} />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-700">
            Price: <span className="font-semibold">{product.price || "Contact for price"}/200gm</span>
          </p>
          <p className="mt-4 text-gray-600">{product.Description}</p>
          <div className="mt-6 flex items-center">
            <label htmlFor="quantity" className="mr-3 text-lg font-medium">Quantity:</label>
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
          {cartMessage && <p className="mt-2 text-green-600 font-medium">{cartMessage}</p>}
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm mb-2">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={i < review.rating ? Star : Star_dull} alt="star" className="w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}

        {/* Add Review */}
        <div className="mt-6 border p-4 rounded-md shadow-md">
          <h4 className="text-xl font-medium mb-2">Write a Review</h4>
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < rating ? Star : Star_dull}
                alt="star"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;