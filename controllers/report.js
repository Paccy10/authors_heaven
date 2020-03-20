import models from '../models';

const {
    reportType: ReportType,
    reportArticle: ReportArticle,
    article: Article,
    user: User
} = models;

class ReportArticleController {
    async createType(req, res) {
        const newType = {
            type: req.body.type
        };
        const reportType = await ReportType.create(newType);
        return res.status(201).json({
            status: 'success',
            message: 'Report type successfully created',
            data: { reportType }
        });
    }

    async getAllTypes(req, res) {
        const reportTypes = await ReportType.findAll();
        return res.status(200).json({
            status: 'success',
            message: 'Report types successfully fetched',
            data: { reportTypes }
        });
    }

    async reportArticle(req, res) {
        const newReportArticle = {
            reportTypeId: req.body.reportTypeId,
            articleId: req.params.articleId,
            reporterId: req.user.id,
            comment: req.body.comment
        };
        const reportArticle = await ReportArticle.create(newReportArticle);
        return res.status(201).json({
            status: 'success',
            message: 'Article successfully reported',
            data: { reportArticle }
        });
    }

    async getReportedArticles(req, res) {
        const reportedArticles = await ReportArticle.findAll({
            include: [
                { model: ReportType, attributes: ['type'] },
                { model: Article, attributes: ['title', 'body'] },
                { model: User, attributes: ['firstname', 'lastname', 'image'] }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Reported articles successfully fetched',
            data: { reportedArticles }
        });
    }
}

export default ReportArticleController;
