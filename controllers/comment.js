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

    async getAll(req, res) {
        const comments = await Comment.findAll({
            where: { articleId: req.params.articleId },
            order: [['id', 'DESC']],
            attributes: ['id', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['firstname', 'lastname', 'image']
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Comments successfully fetched',
            data: { comments }
        });
    }

    async update(req, res) {
        const updateResponse = await Comment.update(
            { body: req.body.body },
            {
                where: { id: req.comment.id },
                returning: true
            }
        );
        return res.status(200).json({
            status: 'success',
            message: 'Comment successfully updated',
            data: { comment: updateResponse[1][0] }
        });
    }

    async delete(req, res) {
        await Comment.destroy({ where: { id: req.params.commentId } });
        return res.status(200).json({
            status: 'success',
            message: 'Comment successfully deleted'
        });
    }
}

export default CommentController;
