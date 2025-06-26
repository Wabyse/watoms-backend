module.exports = (sequelize, DataTypes) => {
    const DocSubCategory = sequelize.define('DocSubCategory', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'document_categories',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'document_sub_categories',
        timestamps: true,
        updatedAt: false,
    });

    DocSubCategory.associate = (models) => {
        DocSubCategory.belongsTo(models.DocCategory, { foreignKey: 'category_id', as: 'document_category' });
        DocSubCategory.hasMany(models.Document, { foreignKey: 'sub_category_id', as: 'documents' });
    };

    return DocSubCategory;
}