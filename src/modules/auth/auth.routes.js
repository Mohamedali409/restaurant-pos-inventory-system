// POST /api/auth/register
// POST /api/auth/login
// GET /api/auth/me
// POST /api/auth/logout

// registerRoute
// loginRoute
// logoutRoute
// meRoute

import express from "express";
import { userLogin, userRegister } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);

export default authRouter;
