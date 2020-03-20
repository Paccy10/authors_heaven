const voteModel = (sequelize, DataTypes) => {
    const Vote = sequelize.define(
        'vote',
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            articleId: {
                type: DataTypes.INTEGER,
                references: { model: 'article', key: 'id' }
            },
            vote: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    Vote.associate = models => {
        Vote.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Vote.belongsTo(models.article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
    };
    return Vote;
};

export default voteModel;
