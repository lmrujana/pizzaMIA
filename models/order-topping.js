module.exports = function(sequelize) {
  const OrderToppings = sequelize.define("OrderToppings", {});

  OrderToppings.associate = function(models) {
    OrderToppings.belongsTo(models.Order, {
      as: "order",
      foreignKey: "OrderId"
    });

    OrderToppings.belongsTo(models.Topping, {
      as: "topping",
      foreignKey: "ToppingId"
    });
  };

  return OrderToppings;
};
