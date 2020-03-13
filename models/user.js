const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            firstname: { type: DataTypes.STRING },
            lastname: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            bio: { type: DataTypes.STRING },
            image: { type: DataTypes.STRING },
            isAdmin: { type: DataTypes.BOOLEAN },
            isActivated: { type: DataTypes.BOOLEAN }
            // allowNotifications: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    // User.associate = models => {
    //     // associations can be defined here
    // };
    return User;
};

export default userModel;
