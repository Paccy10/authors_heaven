import models from '../models';

const { highlight: Highlight } = models;

class HighlightController {
    async create(req, res) {
        const { indexStart, indexEnd, comment } = req.body;
        const text = req.article.body.substring(indexStart, indexEnd);
        const [highlight, created] = await Highlight.findOrCreate({
            where: {
                articleId: req.params.articleId,
                userId: req.user.id,
                text
            },
            defaults: { indexStart, indexEnd, comment }
        });
        if (!created) {
            return res.status(409).json({
                status: 'error',
                errors: [
                    { msg: 'Sorry, you have already higlighted this text' }
                ]
            });
        }
        return res.status(201).json({
            status: 'success',
            message: 'Article text successfully highlighted',
            data: { highlight }
        });
    }

    async getAll(req, res) {
        const highlights = await Highlight.findAll({
            where: { userId: req.user.id, articleId: req.params.articleId }
        });
        return res.status(200).json({
            status: 'success',
            message: 'Article highlits successfully fetched',
            data: { highlights }
        });
    }
}

export default HighlightController;
