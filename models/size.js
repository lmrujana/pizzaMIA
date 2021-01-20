//Creating the Size model
module.exports = function(sequelize, DataTypes) {
  const Size = sequelize.define("Size", {
    //Size of the pizza
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  // Size.associate = function(model) {
  //   Size.hasMany(model.Order);
  // };

  return Size;
};
