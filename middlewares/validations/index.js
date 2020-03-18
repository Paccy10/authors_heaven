import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    if (req.fileValidationError) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: req.fileValidationError }]
        });
    }
    next();
};
