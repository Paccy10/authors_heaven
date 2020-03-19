import { check } from 'express-validator';

export const newCommentValitors = [
    check('body', 'Comment body is required')
        .trim()
        .not()
        .isEmpty()
];
