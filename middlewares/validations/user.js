import { validationResult } from 'express-validator';
import models from '../../models';

const { user: User } = models;

export const validateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    next();
};

export const checkEmail = async (req, res, next) => {
    const userFound = await User.findOne({ where: { email: req.body.email } });
    if (userFound) {
        return res.status(409).json({
            status: 'error',
            errors: [
                {
                    value: req.body.email,
                    msg: 'Email already exists',
                    param: 'email',
                    location: 'body'
                }
            ]
        });
    }
    next();
};
