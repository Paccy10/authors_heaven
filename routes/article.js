import express from 'express';
import Article from '../controllers/article';
import Rating from '../controllers/rating';
import Comment from '../controllers/comment';
import auth from '../middlewares/auth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import {
    checkArticle,
    checkArticleAuthor
} from '../middlewares/validations/article';
import { newArticleValitors } from '../utils/validationRules/article';
import { newRatingValitors } from '../utils/validationRules/rating';
import { newCommentValitors } from '../utils/validationRules/comment';
import upload from '../utils/imageUpload/multer';

const router = express.Router();
const article = new Article();
const rating = new Rating();
const comment = new Comment();

// Articles
router.post(
    '/',
    auth,
    upload.single('image'),
    newArticleValitors,
    validate,
    asyncHandler(article.create)
);

router.get('/', asyncHandler(article.getAll));
router.get('/:slug', asyncHandler(article.getOne));
router.put(
    '/:articleId',
    auth,
    asyncHandler(checkArticle),
    asyncHandler(checkArticleAuthor),
    upload.single('image'),
    newArticleValitors,
    validate,
    asyncHandler(article.update)
);
router.delete(
    '/:articleId',
    auth,
    asyncHandler(checkArticle),
    asyncHandler(checkArticleAuthor),
    asyncHandler(article.delete)
);

// Ratings
router.post(
    '/:articleId/ratings',
    auth,
    asyncHandler(checkArticle),
    newRatingValitors,
    validate,
    asyncHandler(rating.create)
);

router.get(
    '/:articleId/ratings',
    asyncHandler(checkArticle),
    asyncHandler(rating.getAll)
);

// Comments
router.post(
    '/:articleId/comments',
    auth,
    asyncHandler(checkArticle),
    newCommentValitors,
    validate,
    asyncHandler(comment.create)
);

export default router;
