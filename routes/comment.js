import express from 'express';
import Comment from '../controllers/comment';
import auth from '../middlewares/auth';
import checkAuth from '../middlewares/checkAuth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import {
    checkCommentVote,
    checkCommentLike,
    checkCommentDislike
} from '../middlewares/validations/vote';
import {
    checkComment,
    checkCommentAuthor
} from '../middlewares/validations/comment';
import { newCommentValidators } from '../utils/validationRules/comment';

const router = express.Router();
const comment = new Comment();

router.get(
    '/:commentId',
    checkAuth,
    asyncHandler(checkComment),
    asyncHandler(comment.getOne)
);

router.patch(
    '/:commentId',
    auth,
    asyncHandler(checkComment),
    asyncHandler(checkCommentAuthor),
    newCommentValidators,
    validate,
    asyncHandler(comment.update)
);

router.delete(
    '/:commentId',
    auth,
    asyncHandler(checkComment),
    asyncHandler(checkCommentAuthor),
    asyncHandler(comment.delete)
);

router.post(
    '/:commentId/like',
    auth,
    asyncHandler(checkComment),
    asyncHandler(checkCommentVote),
    asyncHandler(checkCommentLike),
    asyncHandler(comment.like)
);

router.post(
    '/:commentId/dislike',
    auth,
    asyncHandler(checkComment),
    asyncHandler(checkCommentVote),
    asyncHandler(checkCommentDislike),
    asyncHandler(comment.dislike)
);

export default router;
