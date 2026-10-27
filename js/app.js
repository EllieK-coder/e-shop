// Milestone 1: render product cards from the `products` array.
// `products` comes from js/products.js, which is loaded before this file.

// 1. Find the element we will fill with cards
const grid = document.querySelector("#product-grid");

// 2. Turn ONE product object into an HTML string
function createProductCard(product) {
  const stockBadge = product.inStock
    ? '<span class="badge in-stock">In stock</span>'
    : '<span class="badge out-of-stock">Out of stock</span>';
  // Then the HTML template (only ${...} parts are code)
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h2 class="product-name">${product.name}</h2>
        ${stockBadge}
        <p class="product-description">${product.description}</p>
        <p class="product-price">€${product.price.toFixed(2)}</p>
      </div>
    </article>
  `;
}

// 3. Turn the WHOLE array into HTML and put it on the page
function renderProducts(list) {
  // map: product object -> HTML string, join: array of strings -> one string
  grid.innerHTML = list.map(createProductCard).join("");
}

// 4. Run it
renderProducts(products);

/*
  EXERCISES (see ROADMAP.md, milestone 1):

  1. Stock badge: inside createProductCard, use a ternary on product.inStock
     to add <span class="badge in-stock">In stock</span>
     or <span class="badge out-of-stock">Out of stock</span>.

  2. Euro formatting: replace `€${product.price.toFixed(2)}` with
     new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" })
       .format(product.price)
     Tip: create the formatter ONCE outside the function and reuse it.

  3. Empty state: in renderProducts, if list.length === 0, set
     grid.innerHTML to a "No products found" message instead.
     Test it with renderProducts([]).
*/
