// Product details page. Needs products.js and cart.js loaded first.

const productDetail = document.querySelector("#product-detail");

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function displayProductDetails(product) {
  const productImage = document.querySelector("#product-image");
  const productName = document.querySelector("#product-name");
  const productCategory = document.querySelector("#product-category");
  const productDescription = document.querySelector("#product-description");
  const productPrice = document.querySelector("#product-price");
  const productStock = document.querySelector("#product-stock");
  const addToCartBtn = document.querySelector("#add-to-cart-btn");

  document.title = `${product.name} · eShop`;
  productImage.src = product.image;
  productImage.alt = product.name;
  productName.textContent = product.name;
  productCategory.textContent = product.category;
  productDescription.textContent = product.description;
  productPrice.textContent = priceFormatter.format(product.price);
  productStock.textContent = product.inStock ? "In stock" : "Out of stock";
  productStock.className = `badge ${product.inStock ? "in-stock" : "out-of-stock"}`;
  addToCartBtn.disabled = !product.inStock;

  addToCartBtn.addEventListener("click", () => addToCart(product.id));
}

async function initProductPage() {
  try {
    await loadProducts();

    const product = products.find((p) => p.id === getProductIdFromURL());

    if (product) {
      displayProductDetails(product);
    } else {
      productDetail.innerHTML = `
        <p class="empty-message">
          Product not found. <a href="index.html">Back to products</a>
        </p>
      `;
    }
  } catch (error) {
    console.error(error);
    productDetail.innerHTML = '<p class="empty-message">Sorry, this product could not be loaded.</p>';
  }
}

initProductPage();