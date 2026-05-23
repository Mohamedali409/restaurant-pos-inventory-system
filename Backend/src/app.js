import cors from "cors";
import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import orderRouter from "./modules/order/order.routes.js";
import productRouter from "./modules/product/product.routes.js";
import inventoryRouter from "./modules/inventory/inventory.routes.js";
import userRouter from "./modules/user/user.routes.js";
import reportRouter from "./modules/report/report.routes.js";
import settingsRouter from "./modules/settings/settings.routes.js";
import { errorHandling } from "./shared/middleware/error.middleware.js";
import requestLogger from "./shared/middleware/requestLogger.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(requestLogger);
app.use("/upload", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/reports", reportRouter);
app.use("/api/settings", settingsRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "بسم الله الرحمن الرحيم - Restaurant POS API",
    version: "1.0.0",
  });
});

app.use(errorHandling);

export default app;
