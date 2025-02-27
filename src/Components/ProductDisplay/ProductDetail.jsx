import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext.jsx";
import products from "../../assets/product.js";
import ImageSlider from "../ProductDisplay/ImageSlider.jsx";
import Star from "../../assets/star_icon.png";
import Star_dull from "../../assets/star_dull_icon.png";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  // For displaying a message when a product is added to the cart
  const [cartMessage, setCartMessage] = useState("");

  // Review state
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0); // default is 0, so all stars are dull initially
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
    setRating(0);
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
            Price:{" "}
            <span className="font-semibold">
              {product.price || "Contact for price"}
            </span>
          </p>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            dignissim, nisl non bibendum sodales, sapien urna ultricies libero,
            a tempor ligula urna non quam.
          </p>
          <div className="mt-6 flex items-center">
            <label
              htmlFor="quantity"
              className="mr-3 text-lg font-medium mb-4 mt-3"
            >
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

      {/* Review Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
              <label className="mb-2 font-medium">Rating:</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={rating >= star ? Star : Star_dull}
                    alt={`${star} star`}
                    onClick={() => setRating(star)}
                    className="cursor-pointer w-8 h-8"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col md:w-1/2">
              <label htmlFor="comment" className="mb-2 font-medium">
                Review:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="Write your review here..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition"
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
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img
                        key={star}
                        src={rev.rating >= star ? Star : Star_dull}
                        alt={`${star} star`}
                        className="w-6 h-6"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">{rev.date}</span>
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
