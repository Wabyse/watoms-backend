module.exports = (sequelize, DataTypes) => {
    const FacilityResult = sequelize.define('FacilityResult', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        report_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'facilities_reports',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'facilities_results',
        timestamps: true,
        updatedAt: false,
    });

    FacilityResult.associate = (models) => {
        FacilityResult.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
        FacilityResult.belongsTo(models.FacilityReport, { foreignKey: 'report_id', as: 'report' });
    };

    return FacilityResult;
}