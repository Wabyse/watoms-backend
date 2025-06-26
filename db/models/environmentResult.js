module.exports = (sequelize, DataTypes) => {
    const EnvironmentResult = sequelize.define('EnvironmentResult', {
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
                model: 'environment_reports',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'environment_results',
        timestamps: true,
        updatedAt: false,
    });

    EnvironmentResult.associate = (models) => {
        EnvironmentResult.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
        EnvironmentResult.belongsTo(models.EnvironmentReport, { foreignKey: 'report_id', as: 'report' });
    };

    return EnvironmentResult;
}