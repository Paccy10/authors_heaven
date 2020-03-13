import express from 'express';
import User from '../controllers/user';
import { signupValidators } from '../utils/validations/user';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { checkEmail } from '../middlewares/user';

const router = express.Router();
const user = new User();

router.post(
    '/signup',
    signupValidators,
    asyncHandler(checkEmail),
    asyncHandler(user.signup)
);

export default router;
