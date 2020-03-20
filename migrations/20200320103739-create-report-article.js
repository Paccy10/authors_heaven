const reportArticleMigration = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('reportArticles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            reporterId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            articleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'articles',
                    key: 'id'
                }
            },
            reportTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'reportTypes',
                    key: 'id'
                }
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: false
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
        return queryInterface.dropTable('reportArticles');
    }
};

export default reportArticleMigration;
