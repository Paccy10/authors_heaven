import models from '../../models';

const { article: Article } = models;

export const checkArticle = async (req, res, next) => {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Article not found' }]
        });
    }
    if (article.authorId !== req.user.id) {
        return res.status(403).json({
            status: 'error',
            errors: [
                {
                    msg:
                        'Permission denied. You can not edit an article that is not yours'
                }
            ]
        });
    }
    req.article = article;
    next();
};
