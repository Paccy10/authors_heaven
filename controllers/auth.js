import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken';
import models from '../models';
import {
    comfirmationEmail,
    resetPasswordEmail
} from '../utils/emails/emailTemplates';
import sendEmail from '../utils/emails/sendEmail';

dotenv.config();

const { user: User, role: Role } = models;

const mailOptions = {
    to: '',
    from: `Authors Heaven <${process.env.MAIL_USER}>`,
    subject: 'Confirmation Email',
    html: ''
};

class AuthController {
    async signup(req, res) {
        const role = await Role.findOne({ where: { title: 'Author' } });
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            roleId: role.id
        };
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const user = await User.create(newUser);
        const payload = { id: user.id, email: user.email };
        const token = generateToken(payload);
        mailOptions.to = user.email;
        mailOptions.html = comfirmationEmail(token, user);
        const emailResponse = await sendEmail(mailOptions);
        delete user.dataValues.password;

        return res.status(201).json({
            status: 'success',
            message: 'User successfully created. Check your email to continue',
            data: { emailResponse, user }
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
            if (!user.isActivated)
                return res.status(400).send({
                    status: 'error',
                    errors: [{ msg: 'Please activate your account' }]
                });
            const payload = {
                id: user.id,
                email: user.email,
                isActivated: user.isActivated,
                roleId: user.roleId
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

    async requestPasswordReset(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({
                status: 'error',
                errors: [{ msg: 'User not found' }]
            });
        }
        const payload = {
            id: user.id,
            email: user.email
        };
        const token = generateToken(payload);
        mailOptions.to = email;
        mailOptions.subject = 'Password Reset';
        mailOptions.html = resetPasswordEmail(token, user);
        const emailResponse = await sendEmail(mailOptions);
        return res.json({
            status: 'success',
            message:
                'Password reset link successfully sent. Please check your email to continue',
            data: { emailResponse }
        });
    }

    async resetPassword(req, res) {
        const payload = jwt.decode(req.body.token, process.env.SECRET_KEY);
        if (!payload) {
            return res.status(400).send({
                status: 'error',
                errors: [{ msg: 'Invalid token' }]
            });
        }
        const newPassword = bcrypt.hashSync(req.body.password, 10);
        await User.update(
            { password: newPassword },
            { where: { email: payload.email }, returning: true }
        );
        return res.status(200).json({
            status: 'success',
            message: 'Password successfully changed'
        });
    }

    async loginViaSocialMedia(req, res) {
        const newUser = req.user;
        const role = await Role.findOne({ where: { title: 'Author' } });
        newUser.roleId = role.id;
        newUser.isActivated = true;
        const [user] = await User.findOrCreate({
            where: { email: newUser.email },
            defaults: newUser
        });

        const payload = {
            id: user.id,
            email: user.email,
            isActivated: user.isActivated,
            roleId: user.roleId
        };
        const token = generateToken(payload);
        delete user.dataValues.password;

        return res.status(200).json({
            status: 'success',
            message: 'User successfully logged in',
            data: { token, user }
        });
    }
}

export default AuthController;
