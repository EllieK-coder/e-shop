# eShop Roadmap

Learning JavaScript by building an eShop step by step.
Each milestone is a small project that becomes part of the final shop.

Stack: HTML, CSS, JavaScript → PHP + MySQL → React

---

## Stage 1: Vanilla JavaScript (front end only)

### 1. Product card grid ✅
- [x] Folder structure and README
- [x] Product data as a JS array of objects
- [x] Render cards with JavaScript (`map` + template literals)
- [x] Responsive CSS grid
- [x] Exercise: add an "In stock / Out of stock" badge
- [x] Exercise: format prices with `Intl.NumberFormat` (€)
- [x] Exercise: show a "No products found" message when the array is empty

**I learned:** arrays of objects, `map`, `join`, template literals, ternaries, `Intl.NumberFormat`, DOM selection, `innerHTML`, early `return`

### 2. Search, filter and sort ✅
- [x] Text search by product name
- [x] Category dropdown (built from the data, not hard-coded)
- [x] Sort by price (low→high, high→low) and name
- [x] Combine all three filters together
- [x] Show "X products found"

**I learned:** `filter`, `sort`, `includes`, `toLowerCase`, `Set`, `switch`, `input` / `change` events, re-rendering

### 3. Shopping cart ✅
- [x] "Add to cart" button on each card
- [x] Cart panel/sidebar with items, quantity +/−, remove
- [x] Live total and cart count badge in the navbar
- [x] Save cart in `localStorage` (survives refresh)

**I learned:** event delegation, `data-*` attributes, `find`, `reduce`, `JSON.stringify` / `JSON.parse`, state

### 4. Form validation ✅
- [x] Register form (name, email, password, confirm password)
- [x] Live validation with error messages under each field
- [x] Password strength indicator
- [x] Reusable validation functions (for login and checkout later)

**I learned:** form events, regex, `preventDefault`, `form.elements`, `Object.keys` / `Object.entries`, `classList.toggle`, reusable functions

### 5. Product details page ✅ current
- [x] Click a card → its own page (`product.html?id=…`)
- [x] Read the product id from the URL with `URLSearchParams`
- [x] "Product not found" message and "Back to products" link
- [x] "Add to cart" from the product page (shared `cart.js`)

**I learned :** URL query parameters, multi-page sites, sharing code between pages, event bubbling

---

## Stage 2: JavaScript + PHP + MySQL

> Setup: XAMPP (Apache + MySQL) or PHP's built-in server `php -S localhost:8000`

### 6. Products from a PHP API ✅ current
- [x] SQLite `products` table and seed data
- [x] `api/products.php` returns JSON (PDO + prepared statements)
- [x] Replace the hard-coded array with `fetch()`
- [x] Loading spinner and error message

**I  learned :** `fetch`, `async/await`, `try/catch`, JSON APIs, PDO


### 7. Login / register with sessions
- [x] `users` table, `password_hash` / `password_verify`
- [x] Register and login endpoints
- [ ] Navbar shows the user's name / Logout
- [ ] Protect pages that need login

**I will learn:** POST requests, PHP sessions, password hashing, auth flow

### 8. Server-side cart and checkout
- [ ] `cart_items`, `orders`, `order_items` tables
- [ ] Sync the localStorage cart to the DB on login
- [ ] Checkout form → creates an order
- [ ] "My orders" page

**I will learn:** relational data, transactions, connecting front-end state to the back end

### 9. Pagination
- [ ] `products.php?page=2&limit=12`
- [ ] "Load more" button (or infinite scroll)
- [ ] Keep filters working with pagination

**I will learn:** query params, `LIMIT/OFFSET`, `IntersectionObserver` (for infinite scroll)

### 10. Admin panel
- [ ] Admin role check
- [ ] Add / edit / delete products
- [ ] Image upload
- [ ] Orders overview

**I will learn:** full CRUD with fetch (POST/PUT/DELETE), file uploads, authorization

---

## Stage 3: React (bonus)

### 11. Cart rebuilt in React ✅
- [x] Vite + React setup
- [x] Components: `ProductCard`, `Cart` (state lives in `App`)
- [x] `useState` for the cart, `useEffect` for localStorage
- [x] Slide-in cart panel with +/−, remove and close

**I learned:** components, props, JSX, `useState`, `useEffect`, conditional rendering, lifting state up, immutable updates

**I will learn:** components, props, state, and why React exists (compare to milestone 3)

### 12. React front end + PHP API
- [ ] Fetch products from the PHP API
- [ ] React Router: Home / Product / Cart / Checkout / Login
- [ ] Cart Context shared across pages
- [ ] Connect login and checkout to PHP

**I will learn:** routing, Context, a full client/server app

---

## Extras (portfolio polish)
- [ ] Dark mode toggle
- [ ] Toast notifications ("Added to cart")
- [ ] Wishlist
- [ ] Star ratings and reviews
- [x] Live demo on GitHub Pages (Stage 1)
- [ ] Live demo on a PHP host (Stage 2+)
- [ ] Screenshots / GIF in the README

## Git habits
- One feature = one commit, e.g. `feat: render product cards from array`
- Prefixes: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`
- Tag milestones: `git tag v0.1.0` after milestone 1, `v0.2.0` after milestone 2, …
