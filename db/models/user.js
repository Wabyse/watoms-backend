module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users_role',
        key: 'id',
      },
      onDelete: 'RESTRICT',
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    paranoid: true,
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
  });

  User.associate = (models) => {
    User.belongsTo(models.UserRole, { foreignKey: 'role_id', as: 'role' });
    User.hasOne(models.Trainee, { foreignKey: 'user_id', as: 'trainee' });
    User.hasOne(models.Employee, { foreignKey: 'user_id', as: 'employee' });
    User.hasMany(models.Document, { foreignKey: 'user_id', as: 'documents' });
    User.hasMany(models.EmployeeCheckInOut, { foreignKey: 'user_id', as: 'emp_check_in_out' });
    User.hasMany(models.CurriculumReport, { foreignKey: 'user_id', as: 'curr_reports' });
    User.hasMany(models.IndividualReport, { foreignKey: 'assessor_id', as: 'assessor_reports' });
    User.hasMany(models.IndividualReport, { foreignKey: 'assessee_id', as: 'assessee_reports' });
    User.hasMany(models.EnvironmentReport, { foreignKey: 'user_id', as: 'environment_reports' });
    User.hasMany(models.CourseReport, { foreignKey: 'user_id', as: 'course_reports' });
    User.hasMany(models.FacilityReport, { foreignKey: 'user_id', as: 'facility_reports' });
  };

  return User;
};
