import sequelize from 'sequelize';
import models from '../models';

const { Op } = sequelize;
const { user: User, article: Article } = models;

class SearchController {
    async search(req, res) {
        let { query } = req.query;
        query = query.trim().toLowerCase();
        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { body: { [Op.iLike]: `%${query}%` } },
                    { tags: { [Op.contains]: [query] } },
                    { '$author.firstname$': { [Op.iLike]: `%${query}%` } },
                    { '$author.lastname$': { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['firstname', 'lastname', 'bio', 'image']
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            message: 'Articles successfully fetched',
            data: { articles }
        });
    }
}

export default SearchController;
