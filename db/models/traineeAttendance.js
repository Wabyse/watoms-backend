module.exports = (sequelize, DataTypes) => {
    const TraineeAttendance = sequelize.define('TraineeAttendance', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        reason: {
            type: DataTypes.TEXT,
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM('absent', 'attend', 'late', 'excused'),
        },
        trainee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trainees',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'trainees_attendance',
        timestamps: true,
    });

    TraineeAttendance.associate = (models) => {
        TraineeAttendance.belongsTo(models.Trainee, { foreignKey: 'trainee_id', as: 'trainee' });
    };

    return TraineeAttendance;
}