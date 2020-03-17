const articleModel = (sequelize, DataTypes) => {
    const Article = sequelize.define(
        'article',
        {
            title: { type: DataTypes.STRING },
            slug: { type: DataTypes.STRING },
            body: { type: DataTypes.TEXT },
            tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
            image: { type: DataTypes.STRING },
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
    };
    return Article;
};

export default articleModel;