import models from '../models';
import { sendToFavorite } from '../utils/notifications/send';

const { comment: Comment, user: User, article: Article } = models;

class CommentController {
    async create(req, res) {
        const newComment = {
            userId: req.user.id,
            articleId: req.params.articleId,
            body: req.body.body
        };
        const user = await User.findByPk(req.user.id);
        const article = await Article.findByPk(req.params.articleId);
        const notificationBody = `${user.firstname} ${user.lastname} has commented on an article you have reacted on.`;

        const comment = await Comment.create(newComment);
        await sendToFavorite(article, user, notificationBody);
        return res.status(201).json({
            status: 'success',
            message: 'Comment successfully created',
            data: { comment }
        });
    }
}

export default CommentController;
