import express from 'express';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validateSearchQueryParam } from '../middlewares/validations/search';
import Search from '../controllers/search';

const router = express.Router();
const search = new Search();

router.post(
    '/',
    asyncHandler(validateSearchQueryParam),
    asyncHandler(search.search)
);

export default router;
