const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// In-memory "DB"
let products = [
  { id: 1, name: "T-shirt", price: 20, image: "/tshirt.jpg" },
  { id: 2, name: "Sneakers", price: 75, image: "/sneakers.jpg" },
  { id: 3, name: "Backpack", price: 50, image: "/backpack.jpg" }
];

let cart = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API endpoints
app.get("/api/products", (req, res) => res.json(products));

app.get("/api/cart", (req, res) => res.json(cart));

app.post("/api/cart/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) cart.push(product);
  res.json(cart);
});

app.delete("/api/cart/:id", (req, res) => {
  cart = cart.filter(p => p.id != req.params.id);
  res.json(cart);
});

app.listen(PORT, () => {
  console.log(`Mini e-commerce running at http://localhost:${PORT}`);
});
