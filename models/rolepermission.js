const rolePermissionModel = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define(
        'rolePermission',
        {
            roleId: {
                type: DataTypes.INTEGER,
                references: { model: 'role', key: 'id' }
            },
            permissionId: {
                type: DataTypes.INTEGER,
                references: { model: 'permission', key: 'id' }
            }
        },
        {}
    );
    RolePermission.associate = () => {
        // associations can be defined here
    };
    return RolePermission;
};

export default rolePermissionModel;
