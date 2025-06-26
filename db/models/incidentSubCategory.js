module.exports = (sequelize, DataTypes) => {
    const IncidentSubCategory = sequelize.define('IncidentSubCategory', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'incidents_categories',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'incidents_sub_categories',
        timestamps: true,
        updatedAt: false,
    });

    IncidentSubCategory.associate = (models) => {
        IncidentSubCategory.belongsTo(models.IncidentCategories, { foreignKey: 'category_id', as: 'incidentCategory' });
        IncidentSubCategory.hasMany(models.Incident, { foreignKey: 'sub_category_id', as: 'incidents' });
    };

    return IncidentSubCategory;
}