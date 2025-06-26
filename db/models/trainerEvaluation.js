module.exports = (sequelize, DataTypes) => {
    const TrainerEvaluation = sequelize.define('TrainerEvaluation', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trainers',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        type: {
            type: DataTypes.ENUM('interview', 'test'),
            allowNull: false
        },
        first_result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        second_result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        third_result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fourth_result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fifth_result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sixth_result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'trainers_evaluation',
        timestamps: true,
    });
    
    TrainerEvaluation.associate = (models) => {
        TrainerEvaluation.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
        TrainerEvaluation.belongsTo(models.Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
    };

    return TrainerEvaluation;
}