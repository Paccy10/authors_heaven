import { check } from 'express-validator';

export const newHighlightValidators = [
    check('indexStart', 'indexStart must be a positive integer')
        .trim()
        .isInt({ min: 0 }),
    check('indexEnd', 'indexEnd must be a positive integer')
        .trim()
        .isInt({ min: 0 }),
    check('comment', 'comment is required')
        .trim()
        .not()
        .isEmpty()
];
