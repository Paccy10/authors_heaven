const highlightModel = (sequelize, DataTypes) => {
    const Highlight = sequelize.define(
        'highlight',
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            articleId: {
                type: DataTypes.INTEGER,
                references: { model: 'article', key: 'id' }
            },
            indexStart: { type: DataTypes.INTEGER },
            indexEnd: { type: DataTypes.INTEGER },
            text: { type: DataTypes.TEXT },
            comment: { type: DataTypes.STRING }
        },
        {}
    );
    Highlight.associate = models => {
        Highlight.belongsTo(models.article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
        Highlight.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Highlight;
};

export default highlightModel;
