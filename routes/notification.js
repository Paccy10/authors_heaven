import express from 'express';
import Notification from '../controllers/notification';
import { notificationSettingsValidators } from '../utils/validationRules/notification';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkNotification } from '../middlewares/validations/notification';
import auth from '../middlewares/auth';
import { checkUserRole } from '../middlewares/validations/user';

const router = express.Router();
const notification = new Notification();

router.post(
    '/subscribe',
    auth,
    notificationSettingsValidators,
    validate,
    asyncHandler(notification.subscribe)
);

router.get('/', auth, asyncHandler(notification.getAll));
router.get(
    '/:notificationId',
    auth,
    asyncHandler(checkNotification),
    asyncHandler(notification.getOne)
);
router.delete(
    '/',
    auth,
    asyncHandler(checkUserRole('Super Admin')),
    asyncHandler(notification.deleteAllSeen)
);

export default router;
