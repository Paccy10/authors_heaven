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
        const payload = jwt.decode(req.params.token, process.env.SECRET_KEY);
        if (payload) {
            const user = await User.findOne({
                where: { email: payload.email }
            });
            if (user.isActivated) {
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
            return res.status(200).json({
                status: 'success',
                message: 'User account successfully activated',
                data: { user: updateResponse[1][0] }
            });
        }
        return res
            .status(400)
            .json({ status: 'error', errors: [{ msg: 'Invalid token' }] });
    }

    async login(req, res) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            if (!user.isActivated) {
                return res.status(400).send({
                    status: 'error',
                    errors: [{ msg: 'Please activate your account' }]
                });
            }
            const payload = {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin
            };
            const token = generateToken(payload);
            delete user.dataValues.password;

            return res.status(200).json({
                status: 'success',
                message: 'User successfully logged in',
                data: { token, user }
            });
        }
        return res.status(400).send({
            status: 'error',
            errors: [{ msg: 'Incorrect username or password' }]
        });
    }
}

export default userController;