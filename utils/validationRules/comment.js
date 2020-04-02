import { check } from 'express-validator';

export const newCommentValidators = [
    check('body', 'Comment body is required')
        .trim()
        .not()
        .isEmpty()
];
