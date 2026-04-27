import express from "express";
import cors from "cors";
import { errorHandling } from "./shared/middleware/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import productRouter from "./modules/product/product.routes.js";
const app = express();

app.use(express.json());
app.use(cors());

//Auth Routers
// TODO

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);

app.use(errorHandling);

export default app;
