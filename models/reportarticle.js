const reportArticleModel = (sequelize, DataTypes) => {
    const ReportArticle = sequelize.define(
        'reportArticle',
        {
            reporterId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            },
            articleId: {
                type: DataTypes.INTEGER,
                references: { model: 'article', key: 'id' }
            },
            reportTypeId: {
                type: DataTypes.INTEGER,
                references: { model: 'reportType', key: 'id' }
            },
            comment: { type: DataTypes.STRING }
        },
        {}
    );
    ReportArticle.associate = models => {
        ReportArticle.belongsTo(models.article, {
            foreignKey: 'articleId',
            onDelete: 'CASCADE'
        });
        ReportArticle.belongsTo(models.reportType, {
            foreignKey: 'reportTypeId',
            onDelete: 'CASCADE'
        });
        ReportArticle.belongsTo(models.user, {
            foreignKey: 'reporterId',
            onDelete: 'CASCADE'
        });
    };
    return ReportArticle;
};

export default reportArticleModel;
