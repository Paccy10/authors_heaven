import models from '../../models';

const { vote: Vote } = models;

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
