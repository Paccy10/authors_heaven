const followingModel = (sequelize, DataTypes) => {
    const Following = sequelize.define(
        'following',
        {
            followerId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            followeeId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            }
        },
        {}
    );
    Following.associate = models => {
        Following.belongsTo(models.user, {
            foreignKey: 'followerId',
            as: 'follower',
            onDelete: 'CASCADE'
        });
        Following.belongsTo(models.user, {
            foreignKey: 'followeeId',
            as: 'followee',
            onDelete: 'CASCADE'
        });
    };
    return Following;
};

export default followingModel;
