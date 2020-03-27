import express from 'express';
import Role from '../controllers/role';
import auth from '../middlewares/auth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkUserRole } from '../middlewares/validations/user';
import {
    checkRoleTitleExist,
    checkRole,
    checkPermissions
} from '../middlewares/validations/role';
import {
    newRoleValidators,
    rolePermissionsValidators
} from '../utils/validationRules/role';

const router = express.Router();
const role = new Role();

router.post(
    '/',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    newRoleValidators,
    validate,
    asyncHandler(checkRoleTitleExist),
    asyncHandler(role.create)
);

router.get(
    '/',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(role.getAll)
);
router.put(
    '/:roleId',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(checkRole),
    newRoleValidators,
    validate,
    asyncHandler(checkRoleTitleExist),
    asyncHandler(role.update)
);
router.delete(
    '/:roleId',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(checkRole),
    asyncHandler(role.delete)
);

router.post(
    '/:roleId/permissions',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(checkRole),
    rolePermissionsValidators,
    validate,
    asyncHandler(checkPermissions),
    asyncHandler(role.assignPermissions)
);

export default router;
