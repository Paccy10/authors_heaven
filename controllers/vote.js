import models from '../models';

const { vote: Vote } = models;

class VoteController {
    async like(req, res) {
        const newVote = {
            userId: req.user.id,
            articleId: req.params.articleId,
            vote: true
        };
        if (req.vote) {
            const updateResponse = await Vote.update(
                { vote: true },
                { where: { id: req.vote.id }, returning: true }
            );
            return res.status(200).json({
                status: 'success',
                message: 'Article successfully liked',
                data: { vote: updateResponse[1][0] }
            });
        }
        const vote = await Vote.create(newVote);
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
        if (req.vote) {
            const updateResponse = await Vote.update(
                { vote: false },
                { where: { id: req.vote.id }, returning: true }
            );
            return res.status(200).json({
                status: 'success',
                message: 'Article successfully disliked',
                data: { vote: updateResponse[1][0] }
            });
        }
        const vote = await Vote.create(newVote);
        return res.status(201).json({
            status: 'success',
            message: 'Article successfully disliked',
            data: { vote }
        });
    }
}

export default VoteController;
