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
import paginate from '../utils/paginationHandler';
import { uploader, destroyer } from '../utils/imageUpload/cloudinary';

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
            email: user.email
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
                isActivated: user.isActivated
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

    async getAll(req, res) {
        const parameters = {
            order: [['firstname', 'ASC']],
            attributes: ['firstname', 'lastname', 'email', 'bio', 'image'],
            where: { isActivated: true }
        };
        const { metaData, data } = await paginate(req, User, parameters);
        return res.status(200).json({
            status: 'success',
            message: 'Articles successfully fetched',
            data: { users: data, metaData }
        });
    }

    async getOne(req, res) {
        const user = await User.findOne({
            where: { email: req.params.email, isActivated: true },
            attributes: ['firstname', 'lastname', 'email', 'bio', 'image']
        });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errors: [{ msg: 'User not found' }]
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'User successfully fetched',
            data: { user }
        });
    }

    async getCurrent(req, res) {
        const user = await User.findOne({
            where: { email: req.user.email },
            attributes: ['firstname', 'lastname', 'email', 'bio', 'image']
        });

        return res.status(200).json({
            status: 'success',
            message: 'User successfully fetched',
            data: { user }
        });
    }

    async update(req, res) {
        const user = await User.findByPk(req.user.id);
        let { image } = user;
        if (req.file) {
            if (user.image) await destroyer(image.public_id);
            image = await uploader(req.file.path, 'authors heaven/users');
        }
        const newProfile = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            bio: req.body.bio,
            image
        };
        const updateResponse = await User.update(newProfile, {
            where: { id: user.id },
            returning: true
        });
        delete updateResponse[1][0].dataValues.password;
        return res.status(200).json({
            status: 'success',
            message: 'User profile successfully updated',
            data: { user: updateResponse[1][0] }
        });
    }
}

export default userController;
