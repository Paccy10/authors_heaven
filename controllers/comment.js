import models from '../models';
import { sendToFavorite } from '../utils/notifications/send';
import generateCommentData from '../utils/generateCommentData';

const {
    comment: Comment,
    user: User,
    article: Article,
    commentVote: CommentVote
} = models;

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

    async getOne(req, res) {
        const { comment } = req;

        const newComment = await generateCommentData(comment, req.user);
        return res.status(200).json({
            status: 'success',
            message: 'Comment successfully fetched',
            data: { comment: newComment }
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

    async like(req, res) {
        const newVote = {
            userId: req.user.id,
            commentId: req.params.commentId,
            vote: true
        };
        if (req.commentVote) {
            const updateResponse = await CommentVote.update(
                { vote: true },
                { where: { id: req.commentVote.id }, returning: true }
            );
            return res.status(200).json({
                status: 'success',
                message: 'Comment successfully liked',
                data: { vote: updateResponse[1][0] }
            });
        }
        const vote = await CommentVote.create(newVote);
        return res.status(201).json({
            status: 'success',
            message: 'Comment successfully liked',
            data: { vote }
        });
    }

    async dislike(req, res) {
        const newVote = {
            userId: req.user.id,
            commentId: req.params.commentId,
            vote: false
        };
        if (req.commentVote) {
            const updateResponse = await CommentVote.update(
                { vote: false },
                { where: { id: req.commentVote.id }, returning: true }
            );
            return res.status(200).json({
                status: 'success',
                message: 'Comment successfully disliked',
                data: { vote: updateResponse[1][0] }
            });
        }
        const vote = await CommentVote.create(newVote);
        return res.status(201).json({
            status: 'success',
            message: 'Comment successfully disliked',
            data: { vote }
        });
    }
}

export default CommentController;
