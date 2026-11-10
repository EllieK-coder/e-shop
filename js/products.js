   // Products now come from the PHP API (api/products.php).
   let products = [];

   async function loadProducts() {
     const response = await fetch("api/products.php");

     if (!response.ok) {
       throw new Error(`Could not load products (HTTP ${response.status})`);
     }

     products = await response.json();
     return products;
   }