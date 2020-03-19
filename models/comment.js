const commentModel = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'comment',
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            articleId: {
                type: DataTypes.INTEGER,
                references: { model: 'article', key: 'id' }
            },
            body: { type: DataTypes.TEXT }
        },
        {}
    );
    Comment.associate = models => {
        Comment.belongsTo(models.user, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });
        Comment.belongsTo(models.article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
    };
    return Comment;
};

export default commentModel;
