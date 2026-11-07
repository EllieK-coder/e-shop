const priceFormatter = new Intl.NumberFormat("el-GR", {
  style: "currency",
  currency: "EUR",
});

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h2 className="product-name">{product.name}</h2>
        <span className={`badge ${product.inStock ? "in-stock" : "out-of-stock"}`}>
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{priceFormatter.format(product.price)}</p>
        <button
          className="add-to-cart-btn"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}