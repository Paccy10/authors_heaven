import models from '../../models';

const { comment: Comment } = models;

export const checkComment = async (req, res, next) => {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) {
        return res.status(404).json({
            status: 'error',
            errors: [{ msg: 'Comment not found' }]
        });
    }

    if (comment.userId !== req.user.id) {
        return res.status(403).json({
            status: 'error',
            errors: [
                {
                    msg:
                        'Permission denied. You can not edit a comment that is not yours'
                }
            ]
        });
    }
    req.comment = comment;
    next();
};
