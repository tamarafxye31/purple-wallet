import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js"; 
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if(process.env.NODE_ENV==="production") job.start(); // Start the cron job


//middleware
app.use(rateLimiter);
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "API is running" });}




app.use ("/api/transactions", transactionsRoute);


initDB().then(() => {
    app.listen(PORT, () => {
    console.log('server is up and running on port 3000');
});
});