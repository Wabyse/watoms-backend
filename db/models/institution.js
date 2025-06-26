module.exports = (sequelize, DataTypes) => {
    const Institution = sequelize.define('Institution', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        no_of_security_cameras: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_emergency_exits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_fire_extinguishers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_sand_buckets: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_labs: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_workshops: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_offices: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_toilets: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_stores: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_gates: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_classes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_buildings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_meeting_rooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tableName: 'institutions',
        timestamps: true,
        updatedAt: false,
    });

    Institution.associate = (models) => {
        Institution.belongsTo(models.Organization, { foreignKey: 'organizationId', as: 'org' });
        Institution.hasMany(models.InstitutionStructureHistory, { foreignKey: 'institution_id', as: 'history' });
        Institution.hasMany(models.Incident, { foreignKey: 'institution_id', as: 'incidents' });
    };

    return Institution;
}