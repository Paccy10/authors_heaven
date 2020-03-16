import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const getToken = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            errors: [{ msg: 'Header does not contain an authorization token' }]
        });
    }
    if (!authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            status: 'error',
            errors: [{ msg: "The token should begin with the word 'Bearer'" }]
        });
    }
    const token = authHeader.split(' ')[1];
    return token;
};

const auth = (req, res, next) => {
    const token = getToken(req, res);
    if (!token) {
        return res.status(401).json({
            status: 'error',
            errors: [{ msg: 'The token does not contain a jwt' }]
        });
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(401).json({
                status: 'error',
                errors: [{ msg: error.message }]
            });
        }
        req.user = user;
        next();
    });
};

export default auth;
