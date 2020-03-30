import express from 'express';
import Article from '../controllers/article';
import Rating from '../controllers/rating';
import Comment from '../controllers/comment';
import Vote from '../controllers/vote';
import Report from '../controllers/report';
import ReadingStats from '../controllers/readingStats';
import auth from '../middlewares/auth';
import checkAuth from '../middlewares/checkAuth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import {
    checkArticleByID,
    checkArticleBySlug,
    checkArticleAuthor
} from '../middlewares/validations/article';
import {
    checkVote,
    checkLike,
    checkDislike
} from '../middlewares/validations/vote';
import { checkReportTypeExist } from '../middlewares/validations/report';
import { newArticleValitors } from '../utils/validationRules/article';
import { newRatingValidators } from '../utils/validationRules/rating';
import { newCommentValitors } from '../utils/validationRules/comment';
import { newReportArticleValidators } from '../utils/validationRules/report';
import upload from '../utils/imageUpload/multer';

const router = express.Router();
const article = new Article();
const rating = new Rating();
const comment = new Comment();
const vote = new Vote();
const report = new Report();
const readingStats = new ReadingStats();

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
router.get(
    '/:slug',
    checkAuth,
    asyncHandler(checkArticleBySlug),
    asyncHandler(article.getOne)
);
router.put(
    '/:articleId',
    auth,
    asyncHandler(checkArticleByID),
    asyncHandler(checkArticleAuthor),
    upload.single('image'),
    newArticleValitors,
    validate,
    asyncHandler(article.update)
);
router.delete(
    '/:articleId',
    auth,
    asyncHandler(checkArticleByID),
    asyncHandler(checkArticleAuthor),
    asyncHandler(article.delete)
);

// Ratings
router.post(
    '/:articleId/ratings',
    auth,
    asyncHandler(checkArticleByID),
    newRatingValidators,
    validate,
    asyncHandler(rating.create)
);

router.get(
    '/:articleId/ratings',
    asyncHandler(checkArticleByID),
    asyncHandler(rating.getAll)
);

// Comments
router.post(
    '/:articleId/comments',
    auth,
    asyncHandler(checkArticleByID),
    newCommentValitors,
    validate,
    asyncHandler(comment.create)
);

// Votes
router.post(
    '/:articleId/like',
    auth,
    asyncHandler(checkArticleByID),
    asyncHandler(checkVote),
    asyncHandler(checkLike),
    asyncHandler(vote.like)
);

router.post(
    '/:articleId/dislike',
    auth,
    asyncHandler(checkArticleByID),
    asyncHandler(checkVote),
    asyncHandler(checkDislike),
    asyncHandler(vote.dislike)
);

// Report Article
router.post(
    '/:articleId/report',
    auth,
    asyncHandler(checkArticleByID),
    newReportArticleValidators,
    validate,
    asyncHandler(checkReportTypeExist),
    asyncHandler(report.reportArticle)
);

// Reading Stats
router.post(
    '/:articleId/readings',
    auth,
    asyncHandler(checkArticleByID),
    asyncHandler(readingStats.create)
);

export default router;
