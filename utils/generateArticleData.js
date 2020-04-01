import models from '../models';
import calculateReadingTime from './calculateReadingTime';

const { vote: Vote, bookmark: Bookmark } = models;

const generateArticleData = async (article, user) => {
    const likes = await Vote.count({
        where: { articleId: article.id, vote: true }
    });
    const dislikes = await Vote.count({
        where: { articleId: article.id, vote: false }
    });
    const votes = { likes, dislikes, hasLiked: false, hasDisliked: false };
    let hasBookmarked = false;
    if (user) {
        const userVote = await Vote.findOne({
            where: { articleId: article.id, userId: user.id }
        });
        if (userVote) {
            votes.hasLiked = !!userVote.vote;
            votes.hasDisliked = !userVote.vote;
        }
        const bookmark = await Bookmark.findOne({
            where: { userId: user.id, articleId: article.id }
        });
        if (bookmark) hasBookmarked = true;
    }
    article.dataValues.readingTime = calculateReadingTime(
        article.title + article.body
    );
    article.dataValues.votes = votes;
    article.dataValues.hasBookmarked = hasBookmarked;
    return article;
};

export default generateArticleData;
