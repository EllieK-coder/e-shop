// Product data (`products`) is loaded from js/products.js.

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");

// Created once and reused, instead of building a new formatter per card.
const priceFormatter = new Intl.NumberFormat("el-GR", {
  style: "currency",
  currency: "EUR",
});

function createProductCard(product) {
  const stockBadge = product.inStock
    ? '<span class="badge in-stock">In stock</span>'
    : '<span class="badge out-of-stock">Out of stock</span>';

  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h2 class="product-name">${product.name}</h2>
        ${stockBadge}
        <p class="product-description">${product.description}</p>
        <p class="product-price">${priceFormatter.format(product.price)}</p>
      </div>
    </article>
  `;
}

function renderProducts(list) {
  if (list.length === 0) {
    grid.innerHTML = '<p class="empty-message">No products found</p>';
    return;
  }

  grid.innerHTML = list.map(createProductCard).join("");
}

renderProducts(products);

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  renderProducts(results);
});