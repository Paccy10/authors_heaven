import models from '../models';

const { rating: Rating } = models;

class RatingController {
    async create(req, res) {
        const rating = parseInt(req.body.rating, 10);
        const userId = req.user.id;
        const { articleId } = req.params;
        let message = 'Rating successfully created';
        let status = 201;

        const [rate, created] = await Rating.findOrCreate({
            where: { userId, articleId },
            defaults: { rating }
        });
        if (!created) {
            const [, updatedRating] = await Rating.update(
                { rating },
                { where: { id: rate.id }, returning: true }
            );
            rate.rating = updatedRating[0].rating;
            rate.updatedAt = updatedRating[0].updatedAt;
            message = 'Rating successfully updated';
            status = 200;
        }
        return res.status(status).json({
            status: 'success',
            message,
            data: { rating: rate }
        });
    }
}

export default RatingController;
