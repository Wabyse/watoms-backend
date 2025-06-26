module.exports = (sequelize, DataTypes) => {
    const Facility = sequelize.define('Facility', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('lab', 'workshop', 'class')
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'facilities',
        timestamps: true,
        updatedAt: false,
    });

    Facility.associate = (models) => {
        Facility.hasMany(models.CourseOffering, { foreignKey: 'facility_id', as: 'courses' });
        Facility.hasMany(models.FacilityReport, { foreignKey: 'facility_id', as: 'reports' });
    };

    return Facility;
}