import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js"; 
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();


//middleware
app.use(rateLimiter);
app.use(express.json());


const PORT = process.env.PORT || 3000;




app.use ("/api/transactions", transactionsRoute);


initDB().then(() => {
    app.listen(PORT, () => {
    console.log('server is up and running on port 3000');
});
});