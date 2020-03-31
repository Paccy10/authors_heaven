import { check } from 'express-validator';

export const notificationSettingsValidators = [
    check('inApp').custom(inApp => {
        if (typeof inApp !== 'boolean') {
            throw new Error('inApp property must be a boolean value');
        }
        return true;
    }),
    check('email').custom(email => {
        if (typeof email !== 'boolean') {
            throw new Error('email property must be a boolean value');
        }
        return true;
    })
];
