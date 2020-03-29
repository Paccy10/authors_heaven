import express from 'express';
import User from '../controllers/user';
import ReadingStats from '../controllers/readingStats';
import Follower from '../controllers/follower';
import { signupValidators } from '../utils/validationRules/user';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import auth from '../middlewares/auth';
import {
    checkFollowee,
    checkFollowing
} from '../middlewares/validations/follower';
import upload from '../utils/imageUpload/multer';

const router = express.Router();
const user = new User();
const readingStats = new ReadingStats();
const follower = new Follower();

router.get('/', auth, asyncHandler(user.getAll));

// Followers
router.get('/followers', auth, asyncHandler(follower.getFollowers));
router.get('/followees', auth, asyncHandler(follower.getFollowees));

// Reading stats
router.get('/readings', auth, asyncHandler(readingStats.getUserReadingStats));

// Profile
router.get('/me', auth, asyncHandler(user.getCurrent));
router.get('/:email', auth, asyncHandler(user.getOne));
router.put(
    '/me',
    auth,
    upload.single('image'),
    [signupValidators[0], signupValidators[1]],
    validate,
    asyncHandler(user.update)
);

// Followers
router.post(
    '/:followeeId/follow',
    auth,
    asyncHandler(checkFollowee),
    asyncHandler(checkFollowing),
    asyncHandler(follower.follow)
);

router.post(
    '/:followeeId/unfollow',
    auth,
    asyncHandler(checkFollowee),
    asyncHandler(follower.unfollow)
);

export default router;
