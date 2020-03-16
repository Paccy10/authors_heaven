import express from 'express';
import auth from '../middlewares/auth';
import Article from '../controllers/article';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
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

export default router;
