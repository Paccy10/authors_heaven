const commentVoteModel = (sequelize, DataTypes) => {
    const CommentVote = sequelize.define(
        'commentVote',
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            commentId: {
                type: DataTypes.INTEGER,
                references: { model: 'comment', key: 'id' }
            },
            vote: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    CommentVote.associate = models => {
        CommentVote.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        CommentVote.belongsTo(models.comment, {
            foreignKey: 'commentId',
            onDelete: 'CASCADE'
        });
    };
    return CommentVote;
};

export default commentVoteModel;
