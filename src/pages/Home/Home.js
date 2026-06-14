import React, { useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const addToCart = (id) => {
    alert("Added to cart: " + id);
  };

  // ✅ Group by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="products-container">
      <h1 className="products-title">Categories</h1>

      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>

          <div className="products-grid">
            {groupedProducts[category].map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;