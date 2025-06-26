module.exports = (sequelize, DataTypes) => {
    const CurriculumUnit = sequelize.define('CurriculumUnit', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('not started yet', 'ongoing', 'done', 'overdue', 'terminated'),
            allowNull: false,
        },
        deadline: {
            type: DataTypes.DATEONLY
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
        curriculum_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'curriculums',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'curriculums_units',
        timestamps: true
    });

    CurriculumUnit.associate = (models) => {
        CurriculumUnit.belongsTo(models.CourseOffering, { foreignKey: 'course_offering_id', as: 'course' });
        CurriculumUnit.belongsTo(models.Curriculum, { foreignKey: 'curriculum_id', as: 'curriculum' });
    };

    return CurriculumUnit;
}