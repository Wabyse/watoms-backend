module.exports = (sequelize, DataTypes) => {
    const Trainer = sequelize.define('Trainer', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        type: {
            type: DataTypes.ENUM('government', 'private'),
            allowNull: false,
            defaultValue: 'government',
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'trainers',
        timestamps: true,
    });

    Trainer.associate = (models) => {
        Trainer.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
        Trainer.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
        Trainer.hasMany(models.CourseOffering, { foreignKey: 'trainer_id', as: 'courses' });
        Trainer.hasMany(models.QuizTest, { foreignKey: 'teacher_id', as: 'quizzes' });
        Trainer.hasMany(models.TrainerLatness, { foreignKey: 'trainer_id', as: 'lateness' });
        Trainer.hasMany(models.TrainerEvaluation, { foreignKey: 'trainer_id', as: 'evaluation' });
    };

    return Trainer;
}