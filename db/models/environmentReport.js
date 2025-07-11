module.exports = (sequelize, DataTypes) => {
    const EnvironmentReport = sequelize.define('EnvironmentReport', {
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
        tableName: 'environment_reports',
        timestamps: true,
        updatedAt: false,
    });

    EnvironmentReport.associate = (models) => {
        EnvironmentReport.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        EnvironmentReport.hasMany(models.EnvironmentResult, { foreignKey: 'report_id', as: 'results' });
        EnvironmentReport.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
    };

    return EnvironmentReport;
}