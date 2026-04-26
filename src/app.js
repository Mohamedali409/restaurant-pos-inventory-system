import express from "express";
import cors from "cors";
import { errorHandling } from "./shared/middleware/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cors());

//Auth Routers
// TODO

app.use(errorHandling);

export default app;
