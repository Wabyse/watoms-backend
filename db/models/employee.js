module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middle_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATEONLY
        },
        address: {
            type: DataTypes.STRING
        },
        qualification: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees_role',
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
        user_id: {
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
        tableName: 'employees',
        timestamps: true,
    });
    
    Employee.associate = (models) => {
        Employee.belongsTo(models.EmployeeRole, { foreignKey: 'role_id', as: 'role' });
        Employee.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
        Employee.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Employee.hasMany(models.Task, { foreignKey: 'assignedby_id', as: 'assigner_tasks' });
        Employee.hasMany(models.Task, { foreignKey: 'assignee_id', as: 'assignee_tasks' });
        Employee.hasOne(models.Trainer, { foreignKey: 'employee_id', as: 'trainer' });
        Employee.hasMany(models.TrainerEvaluation, { foreignKey: 'employee_id', as: 'evaluates' });
    };

    return Employee;
}