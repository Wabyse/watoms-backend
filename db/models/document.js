module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        file_path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sub_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'document_sub_categories',
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
        tableName: 'documents',
        timestamps: true,
        updatedAt: false,
    });

    Document.associate = (models) => {
        Document.belongsTo(models.DocSubCategory, { foreignKey: 'sub_category_id', as: 'documentSubCategory' });
        Document.belongsTo(models.User, { foreignKey: 'user_id', as: 'uploader' });
        Document.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
    };

    return Document;
}