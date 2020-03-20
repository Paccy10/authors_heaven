import { check } from 'express-validator';

export const newReportTypeValidators = [
    check('type', 'Report type is required')
        .trim()
        .not()
        .isEmpty()
];

export const newReportArticleValidators = [
    check('reportTypeId', 'Report type ID must be a positive integer')
        .trim()
        .isInt({ min: 1 }),
    check('comment', 'Comment is required')
        .trim()
        .not()
        .isEmpty()
];
