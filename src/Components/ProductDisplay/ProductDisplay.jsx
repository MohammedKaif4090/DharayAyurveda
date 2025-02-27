import products from "../../assets/product";
import ImageSlider from "./ImageSlider";

const ProductDisplay = () => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-container">
          <h2>{product.name}</h2>
          <ImageSlider images={product.images} />
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
