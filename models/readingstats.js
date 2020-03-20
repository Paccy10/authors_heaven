const readingStatsModel = (sequelize, DataTypes) => {
    const ReadingStats = sequelize.define(
        'readingStats',
        {
            articleId: {
                type: DataTypes.INTEGER,
                references: { model: 'article', key: 'id' }
            },
            readerId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            numberOfReadings: { type: DataTypes.INTEGER }
        },
        {}
    );
    ReadingStats.associate = models => {
        ReadingStats.belongsTo(models.article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
        ReadingStats.belongsTo(models.user, {
            foreignKey: 'readerId',
            onDelete: 'CASCADE'
        });
    };
    return ReadingStats;
};

export default readingStatsModel;
