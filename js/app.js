// Shop page. Needs products.js (data) and cart.js (cart + priceFormatter) loaded first.

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");
const resultsCount = document.querySelector("#results-count");

/* ===== Products ===== */

function createProductCard(product) {
  const stockBadge = product.inStock
    ? '<span class="badge in-stock">In stock</span>'
    : '<span class="badge out-of-stock">Out of stock</span>';

  return `
    <article class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h2 class="product-name">${product.name}</h2>
        ${stockBadge}
        <p class="product-description">${product.description}</p>
        <p class="product-price">${priceFormatter.format(product.price)}</p>
        <button class="add-to-cart-btn" data-id="${product.id}" ${product.inStock ? "" : "disabled"}>
          Add to cart
        </button>
      </div>
    </article>
  `;
}

function renderProducts(list) {
  resultsCount.textContent = `${list.length} ${list.length === 1 ? "product" : "products"} found`;

  if (list.length === 0) {
    grid.innerHTML = '<p class="empty-message">No products found</p>';
    return;
  }

  grid.innerHTML = list.map(createProductCard).join("");
}

function fillCategoryOptions() {
  const categories = [...new Set(products.map((product) => product.category))];

  categorySelect.innerHTML += categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

function sortProducts(list, sortBy) {
  const sorted = [...list];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const results = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(sortProducts(results, sortSelect.value));
}

/* ===== Start ===== */
async function init() {
  grid.innerHTML = '<p class="empty-message">Loading products…</p>';

  try {
    await loadProducts();
    fillCategoryOptions();
    renderProducts(products);
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="empty-message">Sorry, products could not be loaded.</p>';
  }
}

init();

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

// One listener for the whole grid: the button adds to cart, anywhere else on a card opens its page.
grid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-btn");
  if (button) {
    addToCart(Number(button.dataset.id));
    return;
  }

  const card = event.target.closest(".product-card");
  if (card) {
    window.location.href = `product.html?id=${card.dataset.id}`;
  }
});
