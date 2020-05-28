import dotenv from 'dotenv';
import models from '../models';
import paginate from '../utils/paginationHandler';
import { uploader, destroyer } from '../utils/imageUpload/cloudinary';

dotenv.config();

const { user: User, role: Role, article: Article } = models;

class userController {
    async getAll(req, res) {
        const parameters = {
            order: [['firstname', 'ASC']],
            attributes: [
                'firstname',
                'lastname',
                'email',
                'bio',
                'image',
                'allowNotifications'
            ],
            where: { isActivated: true },
            include: [{ model: Role, as: 'role', attributes: ['title'] }]
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
            where: { email: req.user.email }
        });

        delete user.dataValues.password;

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

    async getArticles(req, res) {
        const articles = await Article.findAll({
            where: { authorId: req.user.id }
        });
        return res.status(200).json({
            status: 'success',
            message: 'User articles successfully fetched',
            data: { articles }
        });
    }
}

export default userController;
