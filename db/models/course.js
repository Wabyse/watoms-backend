module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'courses',
        timestamps: true,
        updatedAt: false,
    });

    Course.associate = (models) => {
        Course.hasMany(models.CourseOffering, { foreignKey: 'course_id', as: 'offeredCourses' });
        Course.hasMany(models.Trainer, { foreignKey: 'course_id', as: 'trainers' });
        Course.hasMany(models.QuizzesTestsTemplate, { foreignKey: 'course_id', as: 'quizzes' });
        Course.hasMany(models.Curriculum, { foreignKey: 'course_id', as: 'curriculums' });
    };

    return Course;
}