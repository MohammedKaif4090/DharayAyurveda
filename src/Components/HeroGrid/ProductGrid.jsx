import React from "react";
import products from "../../assets/product"; // Ensure correct path

const ProductGrid = () => {
  return (
    <div className="px-3 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative h-64 rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2"
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <h3 className="text-lg font-semibold text-white">
                {product.name}
              </h3>
              <button
                onClick={() =>
                  window.location.href = `/details/${product.id}`
                }
                className="mt-3 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;



