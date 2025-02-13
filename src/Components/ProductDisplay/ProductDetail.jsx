import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext.jsx";
import products from "../../assets/product.js";
import ImageSlider from "../ProductDisplay/ImageSlider.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  
  // For displaying a message when a product is added to the cart
  const [cartMessage, setCartMessage] = useState("");

  // Review state
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
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
    // Remove the message after 3 seconds
    setTimeout(() => {
      setCartMessage("");
    }, 3000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };
    setReviews([...reviews, newReview]);
    // Reset the review form fields
    setRating(5);
    setComment("");
  };

  return (
    <div className="container mx-auto mt-24 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="md:w-1/2">
          <ImageSlider images={product.images} />
        </div>
        {/* Product Details & Add to Cart */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-700">
            Price: <span className="font-semibold">{product.price || "Contact for price"}</span>
          </p>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            dignissim, nisl non bibendum sodales, sapien urna ultricies libero,
            a tempor ligula urna non quam.
          </p>
          <div className="mt-6 flex items-center">
            <label htmlFor="quantity" className="mr-3 text-lg font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-16 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
          {cartMessage && (
            <p className="mt-2 text-green-600 font-medium">{cartMessage}</p>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
              <label htmlFor="rating" className="mb-2 font-medium">
                Rating:
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            <div className="flex flex-col md:w-1/2">
              <label htmlFor="comment" className="mb-2 font-medium">
                Review:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your review here..."
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="border p-4 rounded-md mb-4">
                <div className="flex items-center mb-2">
                  <span className="font-bold mr-2">
                    {rev.rating} Star{rev.rating > 1 ? "s" : ""}
                  </span>
                  <span className="text-gray-500 text-sm">{rev.date}</span>
                </div>
                <p className="text-gray-700">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

