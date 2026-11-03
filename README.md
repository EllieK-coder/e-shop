# eShop

A dynamic online shop built step by step to practise full-stack web development:
vanilla JavaScript first, then a PHP + MySQL back end, then a React front end.

**Stack:** HTML · CSS · JavaScript · PHP · MySQL · React

**Live demo:** https://elliek-coder.github.io/e-shop/

## Current status
✅ **Stage 1: Vanilla JavaScript complete** (v0.5.0)
🟢 Next: Stage 3 milestone 11 (cart rebuilt in React), then Stage 2 (PHP + MySQL)

See the full plan in [ROADMAP.md](ROADMAP.md).

## Features
- **Product grid** rendered from data, with euro prices and stock badges
- **Search, category filter and sort** (price and name) that work together, with a live "X products found" count
- **Shopping cart** with +/−, remove, live total and navbar count, saved in `localStorage`
- **Product details page** (`product.html?id=…`) with add to cart and a "not found" fallback
- **Register form** with live validation, error messages under each field and a password strength meter

## Run it locally
Stage 1 is plain HTML/CSS/JS, so no setup is needed:

1. Clone the repo
   ```bash
   git clone https://github.com/EllieK-coder/e-shop.git
   cd e-shop
   ```
2. Open `index.html` in your browser
   (or use the VS Code **Live Server** extension for auto-reload)

## Project structure
```
e-shop/
├── index.html          # shop page: grid, search, filters, cart
├── product.html        # product details page
├── register.html       # register form
├── css/
│   └── style.css       # shared styles (CSS variables, grid, cart, forms)
├── js/
│   ├── products.js     # product data (to be replaced by a PHP API)
│   ├── cart.js         # shared cart logic (localStorage, panel, count)
│   ├── app.js          # shop page: rendering, search, filter, sort
│   ├── product.js      # product page: reads the id from the URL
│   ├── validation.js   # reusable validation rules
│   └── register.js     # register form: live validation, strength meter
├── ROADMAP.md
└── README.md
```

## What I learned (Stage 1)
- **Rendering from data:** `map`, template literals, `innerHTML`, `Intl.NumberFormat`
- **Array methods:** `filter`, `find`, `sort`, `reduce`, `Set`
- **Events:** `input` / `change` / `submit`, event delegation, event bubbling, `data-*` attributes
- **State in the browser:** `localStorage` with `JSON.stringify` / `JSON.parse`
- **Forms:** regex, reusable validation functions, `preventDefault`
- **Multi-page structure:** URL query parameters, sharing code between pages, script order
- **Git workflow:** feature branches, pull requests, tagged milestones

## Screenshots
_Coming soon_
