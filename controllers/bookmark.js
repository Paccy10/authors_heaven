import models from '../models';

const { bookmark: Bookmark, article: Article, user: User } = models;

class BookmarkController {
    async bookmark(req, res) {
        const newBookmark = {
            userId: req.user.id,
            articleId: req.params.articleId
        };
        const bookmark = await Bookmark.create(newBookmark);
        return res.status(201).json({
            status: 'success',
            message: 'Article successfully bookmarked',
            data: { bookmark }
        });
    }

    async unbookmark(req, res) {
        const bookmark = await Bookmark.findOne({
            where: { userId: req.user.id, articleId: req.params.articleId }
        });
        if (!bookmark) {
            return res.status(400).json({
                status: 'error',
                errors: [{ msg: 'Sorry, you have not bookmarked this article' }]
            });
        }
        await Bookmark.destroy({
            where: { userId: req.user.id, articleId: req.params.articleId }
        });
        return res.status(200).json({
            status: 'success',
            message: 'Article successfully unbookmarked'
        });
    }

    async getAll(req, res) {
        const bookmarks = await Bookmark.findAll({
            where: { userId: req.user.id },
            attributes: ['id'],
            include: [
                {
                    model: Article,
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: [
                                'firstname',
                                'lastname',
                                'bio',
                                'image'
                            ]
                        }
                    ]
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Bookmarked artilces successfully fetched',
            data: { bookmarks }
        });
    }
}

export default BookmarkController;
