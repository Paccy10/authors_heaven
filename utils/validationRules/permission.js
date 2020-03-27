import { check } from 'express-validator';

export const newPermissionValidators = [
    check('type', 'Permission type is required')
        .trim()
        .not()
        .isEmpty(),
    check('description', 'Permission description is required')
        .trim()
        .not()
        .isEmpty()
];
