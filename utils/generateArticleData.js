import models from '../models';
import calculateReadingTime from './calculateReadingTime';

const { vote: Vote } = models;

const generateArticleData = async (article, user) => {
    const likes = await Vote.count({
        where: { articleId: article.id, vote: true }
    });
    const dislikes = await Vote.count({
        where: { articleId: article.id, vote: false }
    });
    const votes = { likes, dislikes, hasLiked: false, hasDisliked: false };
    if (user) {
        const userVote = await Vote.findOne({
            where: { articleId: article.id, userId: user.id }
        });
        if (userVote) {
            votes.hasLiked = !!userVote.vote;
            votes.hasDisliked = !userVote.vote;
        }
    }
    article.dataValues.readingTime = calculateReadingTime(
        article.title + article.body
    );
    article.dataValues.votes = votes;
    return article;
};

export default generateArticleData;
