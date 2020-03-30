import models from '../../models';

const { article: Article, user: User } = models;

export const checkArticleBySlug = async (req, res, next) => {
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
    req.article = article;
    next();
};

export const checkArticleByID = async (req, res, next) => {
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
