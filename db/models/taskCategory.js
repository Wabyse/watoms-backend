module.exports = (sequelize, DataTypes) => {
    const TaskCategory = sequelize.define('TaskCategory', {
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
        tableName: 'task_categories',
        timestamps: true,
        updatedAt: false,
    });

    TaskCategory.associate = (models) => {
        TaskCategory.hasMany(models.TaskSubCategory, { foreignKey: 'category_id', as: 'subCategory' });
    };

    return TaskCategory;
}