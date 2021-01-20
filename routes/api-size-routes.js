const db = require("../models");

module.exports = function(app) {
  //Get all size
  app.get("/api/sizes", (req, res) => {
    db.Size.findAll({}).then(dbSize => {
      res.json(dbSize);
    });
  });

  //Get a specific size by id
  app.get("/api/sizes/:id", (req, res) => {
    db.Size.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbSize => {
      res.json(dbSize);
    });
  });

  //Add new size option
  app.post("/api/size-new", (req, res) => {
    db.Size.create({
      label: req.body.label,
      price: req.body.price
    }).then(() => {
      res.status(201).send("New size created");
    });
  });

  //Delete a size option
  app.delete("/api/sizes/:id", (req, res) => {
    db.Size.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbSize => {
      res.json(dbSize);
    });
  });
};
