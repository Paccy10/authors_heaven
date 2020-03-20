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
            isAdmin: { type: DataTypes.BOOLEAN },
            isActivated: { type: DataTypes.BOOLEAN }
            // allowNotifications: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    User.associate = models => {
        User.hasMany(models.article, { foreignKey: 'authorId' });
        User.hasMany(models.rating, { foreignKey: 'userId' });
        User.hasMany(models.comment, { foreignKey: 'userId' });
        User.hasMany(models.vote, { foreignKey: 'userId' });
        User.hasMany(models.reportArticle, { foreignKey: 'reporterId' });
        User.hasMany(models.readingStats, { foreignKey: 'readerId' });
    };
    return User;
};

export default userModel;
