import express from "express";
import morgan from "morgan";
import paymentRoutes from "./routes/payment.route.js";
import { PORT } from "./config.js";
import path from 'path'


const app = express();

app.use(morgan("start"));


app.use(paymentRoutes);

app.use(express.static(path.resolve('src/public')))


app.listen(PORT);
console.log("server on port", PORT);
