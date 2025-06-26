module.exports = (sequelize, DataTypes) => {
    const FacilityReport = sequelize.define('FacilityReport', {
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
        facility_id: {
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
        tableName: 'facilities_reports',
        timestamps: true,
        updatedAt: false,
    });

    FacilityReport.associate = (models) => {
        FacilityReport.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        FacilityReport.belongsTo(models.Facility, { foreignKey: 'facility_id', as: 'facility' });
        FacilityReport.hasMany(models.FacilityResult, { foreignKey: 'report_id', as: 'results' });
    };

    return FacilityReport;
}