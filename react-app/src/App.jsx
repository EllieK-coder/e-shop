import { useState, useEffect } from "react";
import { products } from "./products";
import ProductCard from "./components/ProductCard";
export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  function addToCart(product) {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
    <>
      <header className="navbar">
        <a href="/" className="logo">eShop</a>
        <nav>
          <a href="#">Products</a>
          <a href="#" className="cart-link">Cart ({totalItems})</a>
        </nav>
      </header>

      <main className="container">
        <h1>Products</h1>

        <section className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>eShop · Built by Elianna Kalodimou</p>
      </footer>
    </>
  );
}