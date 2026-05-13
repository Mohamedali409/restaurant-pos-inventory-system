import cors from "cors";
import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import orderRouter from "./modules/order/order.routes.js";
import productRouter from "./modules/product/product.routes.js";
import inventoryRouter from "./modules/inventory/inventory.routes.js";
import { errorHandling } from "./shared/middleware/error.middleware.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    // origin: "https://restaurant-pos-inventory-system.vercel.app",
    origin: "*",
    credentials: true,
  }),
);

//Auth Routers
// TODO

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/inventory", inventoryRouter);

app.use(errorHandling);

export default app;
