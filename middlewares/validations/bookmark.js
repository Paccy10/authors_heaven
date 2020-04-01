import models from '../../models';

const { bookmark: Bookmark } = models;

export const checkBookmark = async (req, res, next) => {
    const bookmark = await Bookmark.findOne({
        where: { userId: req.user.id, articleId: req.params.articleId }
    });
    if (bookmark) {
        return res.status(409).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you have already bookmarked this article' }]
        });
    }
    next();
};
