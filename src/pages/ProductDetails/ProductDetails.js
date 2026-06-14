import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import productsData from "../../data/productdetails.json";
import "./ProductDetails.css";

function ProductDetails() {
    const navigate = useNavigate();
  const { id } = useParams();

  const product = productsData.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="details-card">
        <img src={product.image}  alt="Product" className="details-img" />

        <div className="details-info">
  <h2>{product.name}</h2>

  <p className="category">{product.category}</p>

  <h3 className="price">₹{product.price}</h3>

  <div className="rating">⭐⭐⭐⭐⭐ {product.rating}</div>

  <p className="desc">{product.description}</p>

  <button className="buy-btn">Add to Cart</button>
</div>
      </div>
    </div>
  );
}

export default ProductDetails;