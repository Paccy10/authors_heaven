const reportTypeModel = (sequelize, DataTypes) => {
    const ReportType = sequelize.define(
        'reportType',
        {
            type: { type: DataTypes.STRING }
        },
        {}
    );
    ReportType.associate = models => {
        ReportType.hasMany(models.reportArticle, {
            foreignKey: 'reportTypeId'
        });
    };
    return ReportType;
};

export default reportTypeModel;
