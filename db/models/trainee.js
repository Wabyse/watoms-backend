module.exports = (sequelize, DataTypes) => {
    const Trainee = sequelize.define('Trainee', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        middle_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        birth_date: {
            type: DataTypes.DATEONLY
        },
        address: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT'
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
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'organizations',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'trainees',
        timestamps: true,
        updatedAt: false,
    });

    Trainee.associate = (models) => {
        Trainee.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Trainee.belongsTo(models.CourseOffering, { foreignKey: 'course_offering_id', as: 'course' });
        Trainee.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'institution' });
        Trainee.hasMany(models.QuizTest, { foreignKey: 'trainee_id', as: 'quizzes' });
        Trainee.hasMany(models.TraineeAttendance, { foreignKey: 'trainee_id', as: 'attendance' });
    };

    return Trainee;
}