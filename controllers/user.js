import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken';
import models from '../models';
import { comfirmationEmail } from '../utils/emails/emailTemplates';
import sendEmail from '../utils/emails/sendEmail';

dotenv.config();

const { user: User } = models;

const mailOptions = {
    to: '',
    from: `Authors Heaven <${process.env.MAIL_USER}>`,
    subject: 'Confirmation Email',
    html: ''
};

class userController {
    async signup(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }
        const newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const { dataValues: user } = await User.create(newUser);
        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };
        const token = generateToken(payload);
        mailOptions.to = user.email;
        mailOptions.html = comfirmationEmail(token, user);
        const emailResponse = await sendEmail(mailOptions);
        delete user.password;

        return res.status(201).json({
            status: 'success',
            message: 'User successfully created. Check your email to continue',
            data: {
                token,
                emailResponse,
                user
            }
        });
    }

    async activateAccount(req, res) {
        const { token } = req.params;
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        if (payload) {
            const findResponse = await User.findOne({
                where: { email: payload.email }
            });
            if (findResponse.dataValues.isActivated) {
                return res.status(400).json({
                    status: 'error',
                    errors: [{ msg: 'User account already activated' }]
                });
            }
            const updateResponse = await User.update(
                { isActivated: true },
                { where: { email: payload.email }, returning: true }
            );

            delete updateResponse[1][0].dataValues.password;

            res.status(200).json({
                status: 'success',
                message: 'User account successfully activated',
                data: {
                    user: updateResponse[1][0].dataValues
                }
            });
        } else {
            return res.status(400).json({
                status: 'error',
                errors: [{ msg: 'Invalid token' }]
            });
        }
    }
}

export default userController;
