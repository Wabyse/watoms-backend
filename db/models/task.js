module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM('not started yet', 'in progress', '25', '50', '75', 'finished', 'submitted', 'on hold', 'past the due date', 'under review'),
        },
        importance: {
            allowNull: false,
            type: DataTypes.ENUM('normal', 'important', 'urgent'),
        },
        sub_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'task_sub_categories',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        assignedby_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        assignee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        file_path: {
            type: DataTypes.TEXT
        },
        submitted_file_path: {
            type: DataTypes.TEXT
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'tasks',
        timestamps: true,
    });
    
    Task.associate = (models) => {
        Task.belongsTo(models.TaskSubCategory, { foreignKey: 'sub_category_id', as: 'taskSubCategory' });
        Task.belongsTo(models.Employee, { foreignKey: 'assignedby_id', as: 'assigner' });
        Task.belongsTo(models.Employee, { foreignKey: 'assignee_id', as: 'assignee' });
    };

    return Task;
}