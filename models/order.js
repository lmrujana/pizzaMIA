//Creating the Order model
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
    //Size of the pizza
    fkSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fkStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Order;
};
