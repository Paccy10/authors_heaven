const notificationModel = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        'notification',
        {
            receiverId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            body: { type: DataTypes.STRING },
            seen: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    Notification.associate = models => {
        Notification.belongsTo(models.user, {
            as: 'receiver',
            foreignKey: 'receiverId',
            onDelete: 'CASCADE'
        });
    };
    return Notification;
};

export default notificationModel;
