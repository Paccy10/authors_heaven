import express from 'express';
import User from '../controllers/user';
import {
    signupValidators,
    loginValidators
} from '../utils/validationRules/user';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { checkEmail, validateUser } from '../middlewares/validations/user';

const router = express.Router();
const user = new User();

router.post(
    '/signup',
    signupValidators,
    validateUser,
    asyncHandler(checkEmail),
    asyncHandler(user.signup)
);

router.get('/activate/:token', asyncHandler(user.activateAccount));
router.post('/login', loginValidators, validateUser, asyncHandler(user.login));

export default router;
