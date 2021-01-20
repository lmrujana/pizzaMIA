const db = require("../models");

module.exports = function(app) {
  //Get all orders
  app.get("/api/orders", (req, res) => {
    db.Order.findAll({}).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  //Get orders-preparing
  app.get("/api/orders-preparing", (req, res) => {
    db.Order.findAll({
      where: {
        StatusId: 1
      }
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  //Get orders-ready
  app.get("/api/orders-ready", (req, res) => {
    db.Order.findAll({
      where: {
        StatusId: 2
      }
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  //Get orders-done
  app.get("/api/orders-done", (req, res) => {
    db.Order.findAll({
      where: {
        StatusId: 3
      }
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  //Create new order
  const createOrder = (req, res, next) => {
    console.log(req.body);

    db.Order.create({
      customer: req.body.customer,
      SizeId: req.body.SizeId,
      StatusId: req.body.StatusId
    }).then(dbOrder => {
      req.body.id = dbOrder.id;
      next();
    });
  };

  const addToppings = (req, res, next) => {
    //Toppings are selected in a form, using checkboxes. Then they are sent
    //to the back-end in an array.
    const toppingsArray = req.body.toppings;
    console.log(toppingsArray);

    for (let i = 0; i < toppingsArray.length; i++) {
      db.OrderToppings.create({
        OrderId: req.body.id,
        ToppingId: toppingsArray[i]
      });
    }
    res.status(201).send("Order Created");
    next();
  };

  app.post("/api/orders-new", createOrder, addToppings);

  //Updating orders from "preapring" to "ready"
  app.put("/api/ready/:id", (req, res) => {
    db.Order.update(
      {
        StatusId: 2
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(() => {
      res.status(202).send("Updated");
    });
  });

  //Updating orders from "ready" to "done"
  app.put("/api/done/:id", (req, res) => {
    db.Order.update(
      {
        StatusId: 3
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(() => {
      res.status(202).send("Updated");
    });
  });
};
