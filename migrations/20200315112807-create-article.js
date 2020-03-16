const articleMigration = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('articles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            author: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id'
                }
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
        return queryInterface.dropTable('articles');
    }
};

export default articleMigration;
