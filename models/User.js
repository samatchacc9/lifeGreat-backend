// ทำ model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateofbirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE'),
      },
      role: {
        type: DataTypes.ENUM('CUSTOMER', 'ADMIN'),
        defaultValue: 'CUSTOMER',
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subdistrict: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      houseno: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      village: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picurl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      underscored: true, // map ชื่อ colunm ในรูปแบบ uderScore
    },
  );

  //   ความสัมพันธ์

  User.associate = (models) => {
    //User มี Order
    User.hasMany(models.Order, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return User;
};
