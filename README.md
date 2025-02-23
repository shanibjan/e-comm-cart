# E-Commerce Backend API

This is a backend API for an e-commerce platform where users can add, edit, delete products, manage carts, process dummy payments, and view orders. The API is built using Node.js, Express.js, MongoDB, and Razorpay**.

##  Features

# User:
1. Add Products - Create new products with name, price, image, and stock.
2. Product List - Retrieve all available products.
# Customer:
1. View Products - Display products in a card layout.
2. Add to Cart - Add products to the cart, ensuring no duplication (quantity updated accordingly).
3. View Cart - Fetch all products added to the cart.
4. Update/Remove Cart - Modify cart contents or remove products.
5. Process Payment (Dummy) - Simulate payment transactions via Razorpay.
6. Show Order List - View previous orders.

##  Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (for file uploads)
- Razorpay (dummy payments)
- Git & GitHub/GitLab

---



The API will be available at `http://localhost:7000/`

---

##  API Endpoints

### 🔹 Products
- **POST** `/add-product` → Add a new product (requires image upload)
- **GET** `/get-products` → Get all products

### 🔹 Cart
- **POST** `/add-to-cart` → Add a product to cart
- **GET** `/get-cart` → View all cart items
- **PUT** `/update-cart/:id` → Update cart quantity
- **DELETE** `/delete-cart/:id` → Remove a product from the cart

### 🔹 Orders
- **POST** `/create-order` → Create an order (after cart checkout)
- **GET** `/user-orders` → View user orders

### 🔹 Payment (Dummy)
- **POST** `/create-payment` → Initiate dummy payment using Razorpay

---

## 🔒 Input Validation

### Product Validation
- Ensure **name, price, stock, and image** are provided when adding a product validation through formik and yup.

### Cart Validation
- Prevent duplicate products in the cart by increasing/decreasing quantity instead.
- Check stock availability before adding to the cart.

### Order Validation
- Validate the existence of products before placing an order.
- Ensure stock is sufficient before proceeding with an order.

---





