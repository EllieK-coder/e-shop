import { products } from "./products";
import ProductCard from "./components/ProductCard";

export default function App() {
  return (
    <main className="container">
      <h1>Products</h1>
      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}