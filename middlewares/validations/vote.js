import models from '../../models';

const { vote: Vote, commentVote: CommentVote } = models;

export const checkVote = async (req, res, next) => {
    const vote = await Vote.findOne({
        where: { userId: req.user.id, articleId: req.params.articleId }
    });
    if (vote) {
        req.vote = vote;
    }
    next();
};

export const checkLike = async (req, res, next) => {
    if (req.vote && req.vote.vote) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you have already liked this article' }]
        });
    }
    next();
};

export const checkDislike = async (req, res, next) => {
    if (req.vote && !req.vote.vote) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you have already disliked this article' }]
        });
    }
    next();
};

export const checkCommentVote = async (req, res, next) => {
    const commentVote = await CommentVote.findOne({
        where: { userId: req.user.id, commentId: req.params.commentId }
    });
    if (commentVote) {
        req.commentVote = commentVote;
    }
    next();
};

export const checkCommentLike = async (req, res, next) => {
    if (req.commentVote && req.commentVote.vote) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you have already liked this comment' }]
        });
    }
    next();
};

export const checkCommentDislike = async (req, res, next) => {
    if (req.commentVote && !req.commentVote.vote) {
        return res.status(400).json({
            status: 'error',
            errors: [{ msg: 'Sorry, you have already disliked this comment' }]
        });
    }
    next();
};
