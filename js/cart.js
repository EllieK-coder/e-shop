// Shared by every page that has the navbar cart and cart panel.
// Load after products.js and before the page's own script.

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

/* ===== Cart start ===== */

updateCartCount();

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
