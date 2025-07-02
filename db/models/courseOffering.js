module.exports = (sequelize, DataTypes) => {
    const CourseOffering = sequelize.define('CourseOffering', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        planned_hours: {
            type: DataTypes.INTEGER
        },
        finished_hours: {
            type: DataTypes.INTEGER
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
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trainers',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        facility_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'facilities',
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
        tableName: 'course_offerings',
        timestamps: true,
        updatedAt: false,
    });

    CourseOffering.associate = (models) => {
        CourseOffering.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
        CourseOffering.belongsTo(models.Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
        CourseOffering.belongsTo(models.Facility, { foreignKey: 'facility_id', as: 'facility' });
        CourseOffering.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
        CourseOffering.hasMany(models.CurriculumUnit, { foreignKey: 'course_offering_id', as: 'units' });
        CourseOffering.hasMany(models.Trainee, { foreignKey: 'course_offering_id', as: 'trainees' });
        CourseOffering.hasMany(models.TrainerLatness, { foreignKey: 'course_offering_id', as: 'latness' });
        CourseOffering.hasMany(models.CourseReport, { foreignKey: 'course_offering_id', as: 'reports' });
    };

    return CourseOffering;
}