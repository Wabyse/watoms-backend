module.exports = (sequelize, DataTypes) => {
    const TaskSubCategory = sequelize.define('TaskSubCategory', {
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
                model: 'task_categories',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'task_sub_categories',
        timestamps: true,
        updatedAt: false,
    });

    TaskSubCategory.associate = (models) => {
        TaskSubCategory.belongsTo(models.TaskCategory, { foreignKey: 'category_id', as: 'taskCategory' });
        TaskSubCategory.hasMany(models.Task, { foreignKey: 'sub_category_id', as: 'tasks' });
    };

    return TaskSubCategory;
}