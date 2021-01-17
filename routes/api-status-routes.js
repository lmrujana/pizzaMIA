const db = require("../models");

module.exports = function(app) {
  //Get all status
  app.get("/api/statuses", (req, res) => {
    db.Status.findAll({}).then(dbStatus => {
      res.json(dbStatus);
    });
  });

  //Get a specific status by id
  app.get("/api/statuses/:id", (req, res) => {
    db.Status.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbStatus => {
      res.json(dbStatus);
    });
  });

  //Add new status option
  app.post("/api/status-new", (req, res) => {
    db.Status.create({
      label: req.body.label
    }).then(() => {
      res.status(201).send("New status created");
    });
  });

  //Delete a status option
  app.delete("/api/statuses/:id", (req, res) => {
    db.Status.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbStatus => {
      res.json(dbStatus);
    });
  });
};
