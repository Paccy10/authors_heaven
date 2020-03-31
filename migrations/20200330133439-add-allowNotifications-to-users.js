const addAllowNotifications = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('users', 'allowNotifications', {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: { inApp: true, email: false }
        }),

    down: queryInterface =>
        queryInterface.removeColumn('users', 'allowNotifications')
};

export default addAllowNotifications;
