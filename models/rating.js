const ratingModel = (sequelize, DataTypes) => {
    const Rating = sequelize.define(
        'rating',
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            articleId: {
                type: DataTypes.INTEGER,
                references: { model: 'article', key: 'id' }
            },
            rating: { type: DataTypes.INTEGER }
        },
        {}
    );
    Rating.associate = models => {
        Rating.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Rating.belongsTo(models.article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
    };
    return Rating;
};

export default ratingModel;
