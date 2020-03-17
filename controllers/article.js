import models from '../models';
import uploader from '../utils/imageUpload/cloudinary';
import generateSlug from '../utils/generateSlug';
import paginate from '../utils/paginationHandler';

const { article: Article, user: User } = models;

class articleController {
    async create(req, res) {
        let image;
        if (req.fileValidationError) {
            return res.status(400).json({
                status: 'error',
                errors: [{ msg: req.fileValidationError }]
            });
        }
        if (req.file) {
            image = await uploader(req.file.path, 'authors heaven/articles');
        }
        const slug = generateSlug(req.body.title);

        const newArticle = {
            title: req.body.title,
            slug,
            body: req.body.body,
            tags: req.body.tags ? req.body.tags.split(',') : null,
            image: image ? image.url : null,
            authorId: req.user.id
        };
        const { dataValues: article } = await Article.create(newArticle);
        res.status(201).json({
            status: 'success',
            message: 'Article successfully created',
            data: { article }
        });
    }

    async getAll(req, res) {
        const parameters = {
            order: [['id', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: [
                        'id',
                        'firstname',
                        'lastname',
                        'email',
                        'image',
                        'bio'
                    ]
                }
            ]
        };
        const { metaData, data } = await paginate(req, Article, parameters);
        return res.status(200).json({
            status: 'success',
            message: 'Articles successfully fetched',
            data: { articles: data, metaData }
        });
    }

    async getOne(req, res) {
        const article = await Article.findOne({
            where: { slug: req.params.slug },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['firstname', 'lastname', 'email', 'image']
                }
            ]
        });
        if (!article) {
            return res.status(404).json({
                status: 'error',
                errors: [{ msg: 'Article not found' }]
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Article successfully fetched',
            data: { article }
        });
    }
}

export default articleController;
