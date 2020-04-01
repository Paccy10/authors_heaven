const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            firstname: { type: DataTypes.STRING },
            lastname: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            bio: { type: DataTypes.TEXT },
            image: { type: DataTypes.JSON },
            isActivated: { type: DataTypes.BOOLEAN },
            roleId: {
                type: DataTypes.INTEGER,
                references: { model: 'role', key: 'id' }
            },
            allowNotifications: { type: DataTypes.JSON }
        },
        {}
    );
    User.associate = models => {
        User.belongsTo(models.role, {
            foreignKey: 'roleId',
            as: 'role',
            onDelete: 'CASCADE'
        });
        User.hasMany(models.article, { foreignKey: 'authorId' });
        User.hasMany(models.rating, { foreignKey: 'userId' });
        User.hasMany(models.comment, { foreignKey: 'userId' });
        User.hasMany(models.vote, { foreignKey: 'userId' });
        User.hasMany(models.reportArticle, { foreignKey: 'reporterId' });
        User.hasMany(models.readingStats, { foreignKey: 'readerId' });
        User.hasMany(models.notification, { foreignKey: 'receiverId' });
        User.hasMany(models.bookmark, { foreignKey: 'userId' });
    };
    return User;
};

export default userModel;
