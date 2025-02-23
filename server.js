import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import productRoute from "./routes/productRoute.js";
import paymentRoute from './routes/paymentRoute.js'
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();
connectDB();

// CORS configuration for requests with credentials
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.json());
app.use(cookieParser());
// Define API routes first

app.use("/api/products", productRoute);
app.use('/api/payment',paymentRoute);
//  Serve static frontend **after API routes**



const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
