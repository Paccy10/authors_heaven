const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            firstname: { type: DataTypes.STRING },
            lastname: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            bio: { type: DataTypes.TEXT },
            image: { type: DataTypes.STRING },
            isAdmin: { type: DataTypes.BOOLEAN },
            isActivated: { type: DataTypes.BOOLEAN }
            // allowNotifications: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    User.associate = models => {
        User.hasMany(models.article, { foreignKey: 'authorId' });
    };
    return User;
};

export default userModel;
