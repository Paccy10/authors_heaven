import models from '../../models';

const { article: Article } = models;

export const checkArticle = async (req, res, next) => {
    const article = await Article.findByPk(req.params.articleId);
    if (!article) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Article not found' }]
        });
    }
    req.article = article;
    next();
};

export const checkArticleAuthor = async (req, res, next) => {
    const article = await Article.findByPk(req.params.articleId);
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
    next();
};
