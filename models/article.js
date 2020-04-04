const articleModel = (sequelize, DataTypes) => {
    const Article = sequelize.define(
        'article',
        {
            title: { type: DataTypes.STRING },
            slug: { type: DataTypes.STRING },
            body: { type: DataTypes.TEXT },
            tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
            image: { type: DataTypes.JSON },
            authorId: {
                type: DataTypes.INTEGER,
                references: { model: 'user', key: 'id' }
            }
        },
        {}
    );
    Article.associate = models => {
        Article.belongsTo(models.user, {
            foreignKey: 'authorId',
            as: 'author',
            onDelete: 'CASCADE'
        });
        Article.hasMany(models.rating, { foreignKey: 'articleId' });
        Article.hasMany(models.comment, { foreignKey: 'articleId' });
        Article.hasMany(models.vote, { foreignKey: 'articleId' });
        Article.hasMany(models.reportArticle, { foreignKey: 'articleId' });
        Article.hasMany(models.readingStats, { foreignKey: 'articleId' });
        Article.hasMany(models.bookmark, { foreignKey: 'articleId' });
    };
    return Article;
};

export default articleModel;
