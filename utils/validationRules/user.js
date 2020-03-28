import { check } from 'express-validator';

export const signupValidators = [
    check('firstname', 'Firstname is required')
        .trim()
        .not()
        .isEmpty(),
    check('lastname', 'Lastname is required')
        .trim()
        .not()
        .isEmpty(),
    check('email', 'Invalid email')
        .trim()
        .isEmail(),
    check('password', 'Password must be at least 8 characters long')
        .trim()
        .isLength({ min: 8 })
        .custom(password => {
            const alphanumericRegex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
            if (!password.match(alphanumericRegex)) {
                throw new Error('Password must contain letters and numbers');
            }
            if (password.toUpperCase() === password) {
                throw new Error(
                    'Password must contain at least one lowercase letter'
                );
            }
            if (password.toLowerCase() === password) {
                throw new Error(
                    'Password must contain at least one uppercase letter'
                );
            }
            return true;
        })
];

export const loginValidators = [
    check('email', 'Email is required')
        .trim()
        .not()
        .isEmpty(),
    check('password', 'Password is required')
        .trim()
        .not()
        .isEmpty()
];

export const resetPasswordValidators = [
    check('email', 'Email is required')
        .trim()
        .not()
        .isEmpty(),
    check('token', 'Token is required')
        .trim()
        .not()
        .isEmpty()
];

export const loginViaSocilMediaValidators = [
    check('access_token', 'access_token is required')
        .trim()
        .not()
        .isEmpty()
];
