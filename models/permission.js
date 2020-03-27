const permissionModel = (sequelize, DataTypes) => {
    const Permission = sequelize.define(
        'permission',
        {
            type: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING }
        },
        {}
    );
    Permission.associate = models => {
        Permission.belongsToMany(models.role, { through: 'rolePermission' });
    };
    return Permission;
};

export default permissionModel;
