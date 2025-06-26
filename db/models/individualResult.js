module.exports = (sequelize, DataTypes) => {
    const IndividualResult = sequelize.define('IndividualResult', {
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
                model: 'individual_reports',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'individuals_results',
        timestamps: true,
        updatedAt: false,
    });

    IndividualResult.associate = (models) => {
        IndividualResult.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
        IndividualResult.belongsTo(models.IndividualReport, { foreignKey: 'report_id', as: 'report' });
    };

    return IndividualResult;
}