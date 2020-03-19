import models from '../models';
import { uploader, destroyer } from '../utils/imageUpload/cloudinary';
import generateSlug from '../utils/generateSlug';
import paginate from '../utils/paginationHandler';
import calculateReadingTime from '../utils/calculateReadingTime';

const { article: Article, user: User } = models;

class articleController {
    async create(req, res) {
        let image = null;
        if (req.file) {
            image = await uploader(req.file.path, 'authors heaven/articles');
        }
        const slug = generateSlug(req.body.title);

        const newArticle = {
            title: req.body.title,
            slug,
            body: req.body.body,
            tags: req.body.tags ? req.body.tags.split(',') : null,
            image,
            authorId: req.user.id
        };
        const article = await Article.create(newArticle);
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
                    attributes: ['firstname', 'lastname', 'email', 'image']
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
                    attributes: ['firstname', 'lastname', 'image']
                }
            ]
        });
        if (!article) {
            return res.status(404).json({
                status: 'error',
                errors: [{ msg: 'Article not found' }]
            });
        }
        article.dataValues.readingTime = calculateReadingTime(
            article.title + article.body
        );
        return res.status(200).json({
            status: 'success',
            message: 'Article successfully fetched',
            data: { article }
        });
    }

    async update(req, res) {
        let { image } = req.article;
        if (req.file) {
            if (req.article.image) await destroyer(req.article.image.public_id);
            image = await uploader(req.file.path, 'authors heaven/articles');
        }
        const newArticle = {
            title: req.body.title,
            slug: generateSlug(req.body.title),
            body: req.body.body,
            tags: req.body.tags ? req.body.tags.split(',') : null,
            image
        };
        const updateResponse = await Article.update(newArticle, {
            where: { id: req.params.articleId },
            returning: true
        });
        return res.status(200).json({
            status: 'success',
            message: 'Article successfully updated',
            data: { article: updateResponse[1][0] }
        });
    }

    async delete(req, res) {
        if (req.article.image) {
            await destroyer(req.article.image.public_id);
        }
        await Article.destroy({ where: { id: req.params.articleId } });
        return res.status(200).json({
            status: 'success',
            message: 'Article successfully deleted'
        });
    }
}

export default articleController;
