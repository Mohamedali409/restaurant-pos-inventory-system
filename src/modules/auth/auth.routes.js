// POST /api/auth/register
// POST /api/auth/login
// GET /api/auth/me
// POST /api/auth/logout

// registerRoute
// loginRoute
// logoutRoute
// meRoute

import express from 'express';

import validation from '../../shared/middleware/validation.middleware.js';
import { loginValidation, registerValidation } from '../../shared/validators/auth.validator.js';
import { userLogin, userRegister } from './auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidation, validation, userRegister);
authRouter.post('/login', loginValidation, validation, userLogin);

export default authRouter;
