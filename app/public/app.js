async function fetchProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  const list = document.getElementById("product-list");

list.innerHTML = products.map(p => `
  <div class="product-card">
    <img src="${p.image}" alt="${p.name}" class="product-img" />
    <h3>${p.name}</h3>
    <p class="price">$${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  </div>
`).join("");


}

async function fetchCart() {
  const res = await fetch("/api/cart");
  const cart = await res.json();
  const items = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");

  items.innerHTML = cart.map(c => `
    <li>${c.name} - $${c.price} 
      <button onclick="removeFromCart(${c.id})">Remove</button>
    </li>
  `).join("");

  count.textContent = `Cart (${cart.length})`;
}

async function addToCart(id) {
  await fetch(`/api/cart/${id}`, { method: "POST" });
  fetchCart();
}

async function removeFromCart(id) {
  await fetch(`/api/cart/${id}`, { method: "DELETE" });
  fetchCart();
}

fetchProducts();
fetchCart();
