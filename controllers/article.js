import models from '../models';
import uploader from '../utils/imageUpload/cloudinary';
import generateSlug from '../utils/generateSlug';

const { article: Article } = models;

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
            author: req.user.id
        };
        const { dataValues: article } = await Article.create(newArticle);
        res.status(201).json({
            status: 'success',
            message: 'Article successfully created',
            data: { article }
        });
    }
}

export default articleController;
