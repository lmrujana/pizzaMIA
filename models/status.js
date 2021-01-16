//Creating the Status model
module.exports = function(sequelize, DataTypes) {
  const Status = sequelize.define("Status", {
    //Status of the pizza
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Status.associate = function(model) {
  //   Status.hasMany(model.Order);
  // };

  return Status;
};
