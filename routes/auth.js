import express from 'express';
import passport from 'passport';
import Auth from '../controllers/auth';
import {
    signupValidators,
    loginValidators,
    resetPasswordValidators,
    loginViaSocilMediaValidators
} from '../utils/validationRules/user';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkEmail } from '../middlewares/validations/user';
// eslint-disable-next-line no-unused-vars
import passportConf from '../middlewares/passport';

const router = express.Router();
const auth = new Auth();

router.post(
    '/signup',
    signupValidators,
    validate,
    asyncHandler(checkEmail),
    asyncHandler(auth.signup)
);

router.get('/activate/:token', asyncHandler(auth.activateAccount));
router.post('/login', loginValidators, validate, asyncHandler(auth.login));
router.post(
    '/reset-password',
    [resetPasswordValidators[0]],
    validate,
    asyncHandler(auth.requestPasswordReset)
);
router.patch(
    '/reset-password',
    [resetPasswordValidators[1], signupValidators[3]],
    validate,
    asyncHandler(auth.resetPassword)
);

// Social Login
router.post(
    '/login/google',
    loginViaSocilMediaValidators,
    validate,
    passport.authenticate('google', { session: false }),
    asyncHandler(auth.loginViaSocialMedia)
);

router.post(
    '/login/facebook',
    loginViaSocilMediaValidators,
    validate,
    passport.authenticate('facebook', { session: false }),
    asyncHandler(auth.loginViaSocialMedia)
);

export default router;
