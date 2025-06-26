module.exports = (sequelize, DataTypes) => {
    const DocCategory = sequelize.define('DocCategory', {
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
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'document_categories',
        timestamps: true,
        updatedAt: false,
    });

    DocCategory.associate = (models) => {
        DocCategory.hasMany(models.DocSubCategory, { foreignKey: 'category_id', as: 'sub_category' });
    };

    return DocCategory;
}