import express from 'express';
import Article from '../controllers/article';
import auth from '../middlewares/auth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkArticle } from '../middlewares/validations/article';
import { newArticleValitors } from '../utils/validationRules/article';
import upload from '../utils/imageUpload/multer';

const router = express.Router();
const article = new Article();

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
    '/:id',
    auth,
    asyncHandler(checkArticle),
    upload.single('image'),
    newArticleValitors,
    validate,
    asyncHandler(article.update)
);
router.delete(
    '/:id',
    auth,
    asyncHandler(checkArticle),
    asyncHandler(article.delete)
);

export default router;
