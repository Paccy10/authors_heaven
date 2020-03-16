import { check } from 'express-validator';

export const newArticleValitors = [
    check('title', 'Title is required')
        .trim()
        .not()
        .isEmpty(),
    check('body', 'Body is required')
        .trim()
        .not()
        .isEmpty()
];
