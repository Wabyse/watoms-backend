module.exports = (sequelize, DataTypes) => {
    const CourseReport = sequelize.define('CourseReport', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT',
        },
        course_offering_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'course_offerings',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'courses_reports',
        timestamps: true,
        updatedAt: false,
    });

    CourseReport.associate = (models) => {
        CourseReport.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        CourseReport.belongsTo(models.CourseOffering, { foreignKey: 'course_offering_id', as: 'course' });
        CourseReport.hasMany(models.CourseResult, { foreignKey: 'report_id', as: 'results' });
    };

    return CourseReport;
}