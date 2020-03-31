import models from '../models';
import { sendToFavorite } from '../utils/notifications/send';

const { vote: Vote, user: User, article: Article } = models;

class VoteController {
    async like(req, res) {
        const newVote = {
            userId: req.user.id,
            articleId: req.params.articleId,
            vote: true
        };
        const user = await User.findByPk(req.user.id);
        const article = await Article.findByPk(req.params.articleId);
        const notificationBody = `${user.firstname} ${user.lastname} has liked an article you have reacted on.`;
        if (req.vote) {
            const updateResponse = await Vote.update(
                { vote: true },
                { where: { id: req.vote.id }, returning: true }
            );
            await sendToFavorite(article, user, notificationBody);
            return res.status(200).json({
                status: 'success',
                message: 'Article successfully liked',
                data: { vote: updateResponse[1][0] }
            });
        }
        const vote = await Vote.create(newVote);
        await sendToFavorite(article, user, notificationBody);
        return res.status(201).json({
            status: 'success',
            message: 'Article successfully liked',
            data: { vote }
        });
    }

    async dislike(req, res) {
        const newVote = {
            userId: req.user.id,
            articleId: req.params.articleId,
            vote: false
        };
        const user = await User.findByPk(req.user.id);
        const article = await Article.findByPk(req.params.articleId);
        const notificationBody = `${user.firstname} ${user.lastname} has disliked an article you have reacted on.`;
        if (req.vote) {
            const updateResponse = await Vote.update(
                { vote: false },
                { where: { id: req.vote.id }, returning: true }
            );
            await sendToFavorite(article, user, notificationBody);
            return res.status(200).json({
                status: 'success',
                message: 'Article successfully disliked',
                data: { vote: updateResponse[1][0] }
            });
        }
        const vote = await Vote.create(newVote);
        await sendToFavorite(article, user, notificationBody);
        return res.status(201).json({
            status: 'success',
            message: 'Article successfully disliked',
            data: { vote }
        });
    }
}

export default VoteController;
