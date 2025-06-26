module.exports = (sequelize, DataTypes) => {
    const Curriculum = sequelize.define('Curriculum', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        code: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        no_of_units: {
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
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'curriculums',
        timestamps: true,
        updatedAt: false,
    });

    Curriculum.associate = (models) => {
        Curriculum.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
        Curriculum.hasMany(models.CurriculumReport, { foreignKey: 'curriculum_id', as: 'reports' });
        Curriculum.hasMany(models.CurriculumUnit, { foreignKey: 'curriculum_id', as: 'units' });
    };

    return Curriculum;
}