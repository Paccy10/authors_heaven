import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as responses from '../utils/responses';
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
            responses.errorResponse.errors = errors.array();
            return res.status(400).json(responses.errorResponse);
        }
        const newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const { dataValues: user } = await User.create(newUser);
        const payload = {
            id: user.id,
            email: user.id,
            isAdmin: user.isAdmin
        };
        const token = generateToken(payload);
        mailOptions.to = user.email;
        mailOptions.html = comfirmationEmail(token, user);
        const emailResponse = await sendEmail(mailOptions);
        delete user.password;
        responses.successResponse.message =
            'User successfully created. Check your email to continue';
        responses.successResponse.data = {
            user,
            EmailResponse: emailResponse
        };
        return res.status(201).json(responses.successResponse);
    }
}

export default userController;
