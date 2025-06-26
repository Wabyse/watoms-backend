module.exports = (sequelize, DataTypes) => {
    const IndividualReport = sequelize.define('IndividualReport', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        assessor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        assessee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'individual_reports',
        timestamps: true,
        updatedAt: false,
    });
    
    IndividualReport.associate = (models) => {
        IndividualReport.belongsTo(models.User, { foreignKey: 'assessor_id', as: 'assessor' });
        IndividualReport.belongsTo(models.User, { foreignKey: 'assessee_id', as: 'assessee' });
        IndividualReport.hasMany(models.IndividualResult, { foreignKey: 'report_id', as: 'results' });
    };
    
    return IndividualReport;
}