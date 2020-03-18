import express from 'express';
import User from '../controllers/user';
import {
    signupValidators,
    loginValidators,
    resetPasswordValidators
} from '../utils/validationRules/user';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkEmail } from '../middlewares/validations/user';

const router = express.Router();
const user = new User();

router.post(
    '/signup',
    signupValidators,
    validate,
    asyncHandler(checkEmail),
    asyncHandler(user.signup)
);

router.get('/activate/:token', asyncHandler(user.activateAccount));
router.post('/login', loginValidators, validate, asyncHandler(user.login));
router.post(
    '/reset-password',
    [resetPasswordValidators[0]],
    validate,
    asyncHandler(user.requestPasswordReset)
);
router.patch(
    '/reset-password',
    [resetPasswordValidators[1], signupValidators[3]],
    validate,
    asyncHandler(user.resetPassword)
);

export default router;
