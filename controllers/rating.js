import models from '../models';
import paginate from '../utils/paginationHandler';

const { rating: Rating, user: User } = models;

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

    async getAll(req, res) {
        const parameters = {
            order: [['id', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['firstname', 'lastname', 'image']
                }
            ]
        };
        const { metaData, data } = await paginate(req, Rating, parameters);
        return res.status(200).json({
            status: 'success',
            message: 'Ratings successfully fetched',
            data: { ratings: data, metaData }
        });
    }
}

export default RatingController;
