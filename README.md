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

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```sh
    git clone <repository_url>
    cd e-commerce-api
```

### 2️⃣ Install Dependencies
```sh
    npm install
```

### 3️⃣ Set up Environment Variables
Create a `.env` file in the root directory and add the following:
```sh
MONGO_URI=<your_mongodb_connection_string>
RAZORPAY_KEY_ID=<your_razorpay_key>
RAZORPAY_KEY_SECRET=<your_razorpay_secret>
```

### 4️⃣ Start the Server
```sh
    npm start
```

The API will be available at `http://localhost:5000/`

---

## 🔗 API Endpoints

### 🔹 Products
- **POST** `/add-product` → Add a new product (requires image upload)
- **GET** `/get-products` → Get all products
- **PUT** `/update-product/:id` → Update product details
- **DELETE** `/delete-product/:id` → Remove a product

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
- Ensure **name, price, stock, and image** are provided when adding a product.

### Cart Validation
- Prevent duplicate products in the cart by increasing/decreasing quantity instead.
- Check stock availability before adding to the cart.

### Order Validation
- Validate the existence of products before placing an order.
- Ensure stock is sufficient before proceeding with an order.

---

## 🌍 Deployment Steps
1. Push the project to **GitHub/GitLab**:
```sh
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <repository_url>
    git push -u origin main
```
2. Deploy on platforms like **Render, Vercel, or DigitalOcean**.

---

## 📌 License
This project is open-source and available for use.

📌 **GitHub/GitLab Repository Link**: [Coming Soon] 🚀

