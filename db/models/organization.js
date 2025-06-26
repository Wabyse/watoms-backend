module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('institution', 'company', 'government', 'other'),
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    paranoid: true,
    tableName: 'organizations',
    timestamps: true,
    updatedAt: false,
  });

  Organization.associate = (models) => {
    Organization.hasOne(models.Institution, { foreignKey: 'organization_id', as: 'institution' });
    Organization.hasMany(models.Document, { foreignKey: 'organization_id', as: 'documents' });
    Organization.hasMany(models.Employee, { foreignKey: 'organization_id', as: 'employees' });
    Organization.hasMany(models.Trainee, { foreignKey: 'organization_id', as: 'trainees' });
    Organization.hasMany(models.EnvironmentReport, { foreignKey: 'organization_id', as: 'environment_reports' });
    Organization.hasMany(models.CurriculumReport, { foreignKey: 'organization_id', as: 'curriculum_reports' });
  };

  return Organization;
};
