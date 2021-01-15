//Creating the Order model
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
    //Custoner data
    customer: DataTypes.STRING
  });

  Order.associate = function(models) {
    Order.belongsTo(models.Size, {
      as: "size",
      foreignKey: "SizeId"
    });

    Order.belongsTo(models.Status, {
      as: "status",
      foreignKey: "StatusId"
    });
  };

  return Order;
};
