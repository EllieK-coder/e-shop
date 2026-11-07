const priceFormatter = new Intl.NumberFormat("el-GR", {
  style: "currency",
  currency: "EUR",
});

export default function Cart({ items, isOpen }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className={`cart-panel ${isOpen ? "open" : ""}`}>
      <h2>Your cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <br />
                {item.quantity} × {priceFormatter.format(item.price)}
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="cart-total">
        Total: <strong>{priceFormatter.format(total)}</strong>
      </p>
    </aside>
  );
}