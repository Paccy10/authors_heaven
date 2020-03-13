import models from '../models';
import * as responses from '../utils/responses';

const { user: User } = models;

export const checkEmail = async (req, res, next) => {
    const userFound = await User.findOne({ where: { email: req.body.email } });
    if (userFound) {
        responses.errorResponse.errors = [
            {
                value: req.body.email,
                msg: 'Email already exists',
                param: 'email',
                location: 'body'
            }
        ];
        return res.status(409).json(responses.errorResponse);
    }
    next();
};
