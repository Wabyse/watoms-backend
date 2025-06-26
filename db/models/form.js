module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define('Form', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('individual', 'curriculum', 'environment', 'course', 'facility')
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'forms',
        timestamps: true,
        updatedAt: false,
    });

    Form.associate = (models) => {
        Form.hasMany(models.Field, { foreignKey: 'form_id', as: 'fields' });
    };

    return Form;
}