module.exports = (sequelize, DataTypes) => {
    const InstitutionStructureHistory = sequelize.define('InstitutionStructureHistory', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        actual_no_of_security_cameras: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_emergency_exits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_fire_extinguishers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_sand_buckets: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_offices: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_toilets: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_stores: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_gates: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_classes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_buildings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_labs: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_workshops: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_no_of_meeting_rooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        institution_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'institutions',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'institutions_structure_history',
        timestamps: true,
        updatedAt: false,
    });

    InstitutionStructureHistory.associate = (models) => {
        InstitutionStructureHistory.belongsTo(models.Institution, { foreignKey: 'institution_id', as: 'institution' });
    };

    return InstitutionStructureHistory;
}