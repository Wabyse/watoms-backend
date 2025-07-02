module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        en_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ar_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manifest_code: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'questions_manifest',
                key: 'code',
            },
            onDelete: 'RESTRICT'
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_score: {
            type: DataTypes.INTEGER,
        },
        sub_field_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sub_fields',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'questions',
        timestamps: true,
        updatedAt: false,
    });

    Question.associate = (models) => {
        Question.belongsTo(models.SubField, { foreignKey: 'sub_field_id', as: 'sub_field' });
        Question.belongsTo(models.QuestionManifest, { foreignKey: 'manifest_code', as: 'questions' });
        Question.hasMany(models.IndividualResult, { foreignKey: 'question_id', as: 'individual_results' });
        Question.hasMany(models.CurriculumResult, { foreignKey: 'question_id', as: 'curriculum_results' });
        Question.hasMany(models.EnvironmentResult, { foreignKey: 'question_id', as: 'environment_results' });
        Question.hasMany(models.CourseResult, { foreignKey: 'question_id', as: 'course_results' });
        Question.hasMany(models.FacilityResult, { foreignKey: 'question_id', as: 'facility_results' });
    };

    return Question;
}