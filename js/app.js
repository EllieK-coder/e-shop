// Product data (`products`) is loaded from js/products.js.

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");
const resultsCount = document.querySelector("#results-count");
const cartCount = document.querySelector("#cart-count");
const cartLink = document.querySelector("#cart-link");
const cartPanel = document.querySelector("#cart-panel");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

// Created once and reused, instead of building a new formatter per card.
const priceFormatter = new Intl.NumberFormat("el-GR", {
  style: "currency",
  currency: "EUR",
});

/* ===== Products ===== */

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

/* ===== Cart ===== */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Every cart change goes through here, so storage, navbar and panel stay in sync.
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

function changeQuantity(productId, amount) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function totalCartItems() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function totalCartPrice() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartCount() {
  cartCount.textContent = totalCartItems();
}

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartItems.innerHTML = cart
      .map((item) => `
        <li class="cart-item">
          <div>
            <strong>${item.name}</strong><br>
            ${priceFormatter.format(item.price)}
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
            <button class="remove-btn" data-action="remove" data-id="${item.id}">✕</button>
          </div>
        </li>
      `)
      .join("");
  }

  cartTotal.textContent = priceFormatter.format(totalCartPrice());
}

/* ===== Start ===== */

fillCategoryOptions();
renderProducts(products);
updateCartCount();

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-btn");
  if (!button) return;

  addToCart(Number(button.dataset.id));
});

cartLink.addEventListener("click", (event) => {
  event.preventDefault();
  cartPanel.classList.toggle("open");
  renderCart();
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") changeQuantity(id, 1);
  if (action === "decrease") changeQuantity(id, -1);
  if (action === "remove") removeFromCart(id);
});