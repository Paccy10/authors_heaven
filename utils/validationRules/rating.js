import { check } from 'express-validator';

export const newRatingValidators = [
    check('rating', 'Rating must be an integer between 1 and 5')
        .trim()
        .isInt({ min: 1, max: 5 })
];
