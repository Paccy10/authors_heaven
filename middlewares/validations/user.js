import models from '../../models';

const { user: User } = models;

export const checkEmail = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
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

export const checkAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user && !user.isAdmin) {
        return res.status(403).json({
            status: 'error',
            errors: [
                {
                    msg:
                        'Permission denied. You are not allowed to perform this action.'
                }
            ]
        });
    }
    next();
};
