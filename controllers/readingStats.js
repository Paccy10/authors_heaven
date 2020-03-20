/* eslint-disable no-plusplus */
import models from '../models';

const { readingStats: ReadingStats } = models;

class ReadingStatsController {
    async create(req, res) {
        const userId = req.user.id;
        const { articleId } = req.params;
        const message = 'Reading successfully recorded';
        let status = 201;

        const [reading, created] = await ReadingStats.findOrCreate({
            where: { readerId: userId, articleId },
            defaults: { numberOfReadings: 1 }
        });
        if (!created) {
            const [, updatedReading] = await ReadingStats.update(
                { numberOfReadings: reading.numberOfReadings + 1 },
                { where: { id: reading.id }, returning: true }
            );
            reading.numberOfReadings = updatedReading[0].numberOfReadings;
            reading.updatedAt = updatedReading[0].updatedAt;
            status = 200;
        }
        return res.status(status).json({
            status: 'success',
            message,
            data: { reading }
        });
    }

    async getUserReadingStats(req, res) {
        let totalReadings = 0;
        const userReadings = await ReadingStats.findAll({
            where: { readerId: req.user.id }
        });
        for (let i = 0; i < userReadings.length; i++) {
            totalReadings += userReadings[i].numberOfReadings;
        }

        return res.status(200).json({
            status: 'success',
            message: 'User total readings successfully fetched',
            data: { totalReadings }
        });
    }
}

export default ReadingStatsController;
