const db = require("../models");

module.exports = function(app) {
  //Get all toppings available
  app.get("/api/toppings", (req, res) => {
    db.Topping.findAll({}).then(dbTopping => {
      res.json(dbTopping);
    });
  });

  //Get one topping by id
  app.get("/api/toppings/:id", (req, res) => {
    db.Topping.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbTopping => {
      res.json(dbTopping);
    });
  });

  //Add new topping
  app.post("/api/topping-new", (req, res) => {
    db.Topping.create({
      label: req.body.label
    }).then(() => {
      res.status(201).send("Topping added!");
    });
  });

  //Delete a topping
  app.delete("/api/toppings/:id", (req, res) => {
    db.Topping.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbToppings => {
      res.json(dbToppings);
    });
  });
};
