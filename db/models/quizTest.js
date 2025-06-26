module.exports = (sequelize, DataTypes) => {
    const QuizTest = sequelize.define('QuizTest', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        result: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trainers',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        trainee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trainees',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        template_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizzes_and_tests_template',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'quizzes_and_tests',
        timestamps: true,
        updatedAt: false,
    });

    QuizTest.associate = (models) => {
        QuizTest.belongsTo(models.Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
        QuizTest.belongsTo(models.Trainee, { foreignKey: 'trainee_id', as: 'trainee' });
        QuizTest.belongsTo(models.QuizzesTestsTemplate, { foreignKey: 'template_id', as: 'template' });
    };

    return QuizTest;
}