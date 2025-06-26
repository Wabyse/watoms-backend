module.exports = (sequelize, DataTypes) => {
    const CourseResult = sequelize.define('CourseResult', {
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
                model: 'courses_reports',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'courses_results',
        timestamps: true,
        updatedAt: false,
    });

    CourseResult.associate = (models) => {
        CourseResult.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
        CourseResult.belongsTo(models.CourseReport, { foreignKey: 'report_id', as: 'report' });
    };

    return CourseResult;
}