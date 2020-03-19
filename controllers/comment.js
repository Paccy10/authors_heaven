import models from '../models';

const { comment: Comment } = models;

class CommentController {
    async create(req, res) {
        const newComment = {
            userId: req.user.id,
            articleId: req.params.articleId,
            body: req.body.body
        };

        const comment = await Comment.create(newComment);
        return res.status(201).json({
            status: 'success',
            message: 'Comment successfully created',
            data: { comment }
        });
    }
}

export default CommentController;
