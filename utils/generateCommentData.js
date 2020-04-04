import models from '../models';

const { commentVote: CommentVote } = models;

const generateCommentData = async (comment, user) => {
    const likes = await CommentVote.count({
        where: { commentId: comment.id, vote: true }
    });
    const dislikes = await CommentVote.count({
        where: { commentId: comment.id, vote: false }
    });
    const votes = { likes, dislikes, hasLiked: false, hasDisliked: false };
    if (user) {
        const userVote = await CommentVote.findOne({
            where: { commentId: comment.id, userId: user.id }
        });
        if (userVote) {
            votes.hasLiked = !!userVote.vote;
            votes.hasDisliked = !userVote.vote;
        }
    }
    comment.dataValues.votes = votes;
    return comment;
};

export default generateCommentData;
