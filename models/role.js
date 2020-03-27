const roleModel = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'role',
        {
            title: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING }
        },
        {}
    );
    Role.associate = models => {
        Role.belongsToMany(models.permission, { through: 'rolePermission' });
    };
    return Role;
};

export default roleModel;
