import { check } from 'express-validator';

export const newRoleValidators = [
    check('title', 'Role title is required')
        .trim()
        .not()
        .isEmpty(),
    check('description', 'Role description is required')
        .trim()
        .not()
        .isEmpty()
];

export const rolePermissionsValidators = [
    check('permissions', 'Permissions are required').custom(permissions => {
        if (!Array.isArray(permissions)) {
            throw new Error('Permissions must be an array');
        }

        if (permissions.length < 1) {
            throw new Error('Permissions are required');
        }
        return true;
    })
];
