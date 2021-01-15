//Creating the Topping model
module.exports = function(sequelize, DataTypes) {
  const Topping = sequelize.define("Topping", {
    //Toppings for the pizza
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Topping;
};
