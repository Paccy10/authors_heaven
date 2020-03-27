import express from 'express';
import Permission from '../controllers/permission';
import auth from '../middlewares/auth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkUserRole } from '../middlewares/validations/user';
import {
    checkPermissionTypeExist,
    checkPermission
} from '../middlewares/validations/permission';
import { newPermissionValidators } from '../utils/validationRules/permission';

const router = express.Router();
const permission = new Permission();

router.post(
    '/',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    newPermissionValidators,
    validate,
    asyncHandler(checkPermissionTypeExist),
    asyncHandler(permission.create)
);

router.get(
    '/',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(permission.getAll)
);
router.put(
    '/:permissionId',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(checkPermission),
    newPermissionValidators,
    validate,
    asyncHandler(checkPermissionTypeExist),
    asyncHandler(permission.update)
);
router.delete(
    '/:permissionId',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(checkPermission),
    asyncHandler(permission.delete)
);

export default router;
