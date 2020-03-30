import auth from './auth';

const checkAuth = (req, res, next) => {
    if (req.headers.authorization) {
        return auth(req, res, next);
    }
    next();
};

export default checkAuth;
