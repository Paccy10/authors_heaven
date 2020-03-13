const userMigration = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lastname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            bio: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING
            },
            isAdmin: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isActivated: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable('users');
    }
};

export default userMigration;
