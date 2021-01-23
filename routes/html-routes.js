// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

//Requiring models
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  //New order page
  app.get("/new-order", async (req, res) => {
    const sizes = await db.Size.findAll({});

    const toppings = await db.Topping.findAll({});

    const hbsObject = {
      sizes,
      toppings
    };

    // console.log(hbsObject);
    res.render("new-order", hbsObject);
  });

  //Add topping page
  app.get("/add-topping", async (req, res) => {
    const toppings = await db.Topping.findAll({});

    const hbsObject = { toppings };

    res.render("add-topping", hbsObject);
  });
  app.get("/index", async (req, res) => {
    const orders = await db.Order.findAll({});

    const orderToppings = await db.OrderToppings.findAll({});

    // console.log(orderToppings);
    const hbsObject = {
      orders,
      orderToppings
    };

    res.render("index", hbsObject);
  });

  //Previous Orders oage
  app.get("/previous-orders", async (req, res) => {
    const orders = await db.Order.findAll({
      where: {
        StatusId: 3
      },
      include: [
        {
          model: db.Size,
          as: "size"
        }
      ]
    });

    // console.log(orders[0].size);
    const hbsObject = {
      orders
    };

    res.render("previous-orders", hbsObject);
  });

  app.get("/order-details/:id", async (req, res) => {
    const orderToppings = await db.OrderToppings.findAll({
      where: {
        OrderId: Number(req.params.id)
      },
      include: [
        {
          model: db.Order,
          as: "order",
          include: [
            {
              model: db.Size,
              as: "size"
            }
          ]
        },
        {
          model: db.Topping,
          as: "topping"
        }
      ]
    });
    const hbsObject = {
      orderToppings
    };

    console.log(hbsObject);
    res.render("order-details", hbsObject);
  });
};
