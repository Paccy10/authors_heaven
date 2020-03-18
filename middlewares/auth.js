import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const getToken = authHeader => {
    if (!authHeader) {
        throw new Error('Header does not contain an authorization token');
    }
    if (!authHeader.startsWith('Bearer')) {
        throw new Error("The token should begin with the word 'Bearer'");
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('The token does not contain a jwt');
    }
    return token;
};

const auth = (req, res, next) => {
    try {
        const token = getToken(req.headers.authorization);
        jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
            if (error)
                return res.status(401).json({
                    status: 'error',
                    errors: [{ msg: error.message }]
                });
            if (!user.isActivated)
                return res.status(401).json({
                    status: 'error',
                    errors: [
                        { msg: 'Unauthorized. Please activate your account' }
                    ]
                });
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            errors: [{ msg: error.message }]
        });
    }
};

export default auth;
