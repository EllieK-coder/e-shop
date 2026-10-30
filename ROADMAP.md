# eShop Roadmap

Learning JavaScript by building an eShop step by step.
Each milestone is a small project that becomes part of the final shop.
Tick a box when it's done and make one commit per feature.

Stack: HTML, CSS, JavaScript → PHP + MySQL → React (bonus)

---

## Stage 1: Vanilla JavaScript (front end only)

### 1. Product card grid ✅- [x] Folder structure and README
- [x] Product data as a JS array of objects
- [x] Render cards with JavaScript (`map` + template literals)
- [x] Responsive CSS grid
- [x] Exercise: add an "In stock / Out of stock" badge
- [x] Exercise: format prices with `Intl.NumberFormat` (€)
- [x] Exercise: show a "No products found" message when the array is empty

### 2. Search, filter and sort ⬅️ current
- [x] Text search by product name
- [ ] Category dropdown (built from the data, not hard-coded)
- [ ] Sort by price (low→high, high→low) and name
- [ ] Combine all three filters together
- [ ] Show "X products found"

**You learn:** `filter`, `sort`, `includes`, `toLowerCase`, `input` / `change` events, re-rendering

### 3. Shopping cart
- [ ] "Add to cart" button on each card
- [ ] Cart panel/sidebar with items, quantity +/−, remove
- [ ] Live total and cart count badge in the navbar
- [ ] Save cart in `localStorage` (survives refresh)

**You learn:** event delegation, `data-*` attributes, `find`, `reduce`, `JSON.stringify` / `JSON.parse`, state

### 4. Form validation
- [ ] Register form (name, email, password, confirm password)
- [ ] Live validation with error messages under each field
- [ ] Password strength indicator
- [ ] Reusable validation functions (for login and checkout later)

**You learn:** form events, regex basics, `preventDefault`, reusable functions

### 5. Product details modal
- [ ] Click a card → modal with full details
- [ ] Image gallery (thumbnails, next/prev)
- [ ] Close with ✕, Escape key, or click outside
- [ ] "Add to cart" from inside the modal

**You learn:** showing/hiding UI, keyboard events, `classList`, accessibility basics

---

## Stage 2: JavaScript + PHP + MySQL

> Setup: XAMPP (Apache + MySQL) or PHP's built-in server `php -S localhost:8000`

### 6. Products from a PHP API
- [ ] MySQL `products` table and seed data
- [ ] `api/products.php` returns JSON (PDO + prepared statements)
- [ ] Replace the hard-coded array with `fetch()`
- [ ] Loading spinner and error message

**You learn:** `fetch`, `async/await`, `try/catch`, JSON APIs, PDO

### 7. Login / register with sessions
- [ ] `users` table, `password_hash` / `password_verify`
- [ ] Register and login endpoints
- [ ] Navbar shows the user's name / Logout
- [ ] Protect pages that need login

**You learn:** POST requests, PHP sessions, password hashing, auth flow

### 8. Server-side cart and checkout
- [ ] `cart_items`, `orders`, `order_items` tables
- [ ] Sync the localStorage cart to the DB on login
- [ ] Checkout form → creates an order
- [ ] "My orders" page

**You learn:** relational data, transactions, connecting front-end state to the back end

### 9. Pagination
- [ ] `products.php?page=2&limit=12`
- [ ] "Load more" button (or infinite scroll)
- [ ] Keep filters working with pagination

**You learn:** query params, `LIMIT/OFFSET`, `IntersectionObserver` (for infinite scroll)

### 10. Admin panel
- [ ] Admin role check
- [ ] Add / edit / delete products
- [ ] Image upload
- [ ] Orders overview

**You learn:** full CRUD with fetch (POST/PUT/DELETE), file uploads, authorization

---

## Stage 3: React (bonus)

### 11. Cart rebuilt in React
- [ ] Vite + React setup
- [ ] Components: `ProductCard`, `ProductGrid`, `CartItem`, `Cart`
- [ ] `useState` for the cart, `useEffect` for localStorage

**You learn:** components, props, state, and why React exists (compare to milestone 3)

### 12. React front end + PHP API
- [ ] Fetch products from the PHP API
- [ ] React Router: Home / Product / Cart / Checkout / Login
- [ ] Cart Context shared across pages
- [ ] Connect login and checkout to PHP

**You learn:** routing, Context, a full client/server app

---

## Extras (portfolio polish)
- [ ] Dark mode toggle
- [ ] Toast notifications ("Added to cart")
- [ ] Wishlist
- [ ] Star ratings and reviews
- [ ] Live demo (GitHub Pages for Stage 1; a PHP host for Stage 2+)
- [ ] Screenshots / GIF in the README

## Git habits
- One feature = one commit, e.g. `feat: render product cards from array`
- Prefixes: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`
- Tag milestones: `git tag v0.1.0` after milestone 1, `v0.2.0` after milestone 2, …
