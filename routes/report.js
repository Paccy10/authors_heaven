import express from 'express';
import Report from '../controllers/report';
import auth from '../middlewares/auth';
import asyncHandler from '../middlewares/errors/asyncHandler';
import { validate } from '../middlewares/validations';
import { checkReportType } from '../middlewares/validations/report';
import { checkUserRole } from '../middlewares/validations/user';
import { newReportTypeValidators } from '../utils/validationRules/report';

const router = express.Router();
const report = new Report();

router.post(
    '/types',
    auth,
    asyncHandler(checkUserRole('Admin')),
    newReportTypeValidators,
    validate,
    asyncHandler(checkReportType),
    asyncHandler(report.createType)
);

router.get('/types', auth, asyncHandler(report.getAllTypes));

router.get(
    '/articles',
    auth,
    asyncHandler(checkUserRole('Admin')),
    asyncHandler(report.getReportedArticles)
);

export default router;
