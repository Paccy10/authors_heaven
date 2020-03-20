import express from 'express';
import User from '../controllers/user';
import ReadingStats from '../controllers/readingStats';
import {
    signupValidators,
    loginValidators,
    resetPasswordValidators
} from '../utils/validationRules/user';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkEmail } from '../middlewares/validations/user';
import auth from '../middlewares/auth';
import upload from '../utils/imageUpload/multer';

const router = express.Router();
const user = new User();
const readingStats = new ReadingStats();

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
router.get('/', auth, asyncHandler(user.getAll));

// Profile
router.get('/profile', auth, asyncHandler(user.getCurrent));
router.get('/profile/:email', auth, asyncHandler(user.getOne));
router.put(
    '/profile',
    auth,
    upload.single('image'),
    [signupValidators[0], signupValidators[1]],
    validate,
    asyncHandler(user.update)
);

// Reading stats
router.get('/readings', auth, asyncHandler(readingStats.getUserReadingStats));

export default router;
