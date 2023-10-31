const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    // create our associations

    static associations(models) {
      // create associations in here
    }
  }

  Items.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
          }
      }
    },
    {
      sequelize,
      modelName: "items",
      timestamps: true,
      underscored: true,
    }
  );

  return Items
};
