module.exports = (sequelize, DataTypes) => {
    const TrainerLatness = sequelize.define('TrainerLatness', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        late: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trainers',
                key: 'id',
            },
            onDelete: "RESTRICT",
        },
        courseOffering_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'course_offerings',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'trainers_latness',
        timestamps: true,
        updatedAt: false,
    });

    TrainerLatness.associate = (models) => {
        TrainerLatness.belongsTo(models.Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
        TrainerLatness.belongsTo(models.CourseOffering, { foreignKey: 'course_offering_id', as: 'course_offering' });
    };

    return TrainerLatness;
}