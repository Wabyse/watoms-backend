module.exports = (sequelize, DataTypes) => {
    const CurriculumReport = sequelize.define('CurriculumReport', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT',
        },
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'organizations',
                key: 'id',
            },
            onDelete: 'RESTRICT',
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'curriculums_reports',
        timestamps: true,
        updatedAt: false,
    });

    CurriculumReport.associate = (models) => {
        CurriculumReport.belongsTo(models.Curriculum, { foreignKey: 'curriculum_id', as: 'curriculum' });
        CurriculumReport.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        CurriculumReport.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
        CurriculumReport.hasMany(models.CurriculumResult, { foreignKey: 'report_id', as: 'results' });
    };

    return CurriculumReport;
}