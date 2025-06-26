module.exports = (sequelize, DataTypes) => {
    const Incident = sequelize.define('Incident', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.TEXT
        },
        location: {
            type: DataTypes.TEXT
        },
        file_path: {
            type: DataTypes.TEXT
        },
        incident_date: {
            type: DataTypes.DATE,
        },
        institution_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'institutions',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        sub_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'incidents_sub_categories',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'incidents',
        timestamps: true,
        updatedAt: false,
    });

    Incident.associate = (models) => {
        Incident.belongsTo(models.Institution, { foreignKey: 'institution_id', as: 'institution' });
        Incident.belongsTo(models.IncidentSubCategory, { foreignKey: 'sub_category_id', as: 'sub_category' });
    };

    return Incident;
}