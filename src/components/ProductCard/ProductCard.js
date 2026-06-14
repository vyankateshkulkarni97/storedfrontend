import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.image} alt={product.name} className="product-img" />

      <div className="product-name">{product.name}</div>

      <div className="product-price">₹{product.price}</div>

      <button
        className="add-to-cart-btn"
        onClick={(e) => {
          e.stopPropagation(); // 🔥 prevent redirect
          addToCart(product.id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;