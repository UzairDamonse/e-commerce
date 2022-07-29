const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// All orders

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single orders

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM orders WHERE orders.order_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add orders

router.post("/", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
    const { user_id, amount, shipping_address, order_email, order_status } =
      req.body;

    const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      con.query(
        `INSERT INTO orders (user_id,amount,shipping_address,order_email,order_date,order_status) VALUES ("${user_id}","${amount}","${shipping_address}","${order_email}","${order_date}","${order_status}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});

// Edit orders

router.put("/:id", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
    const { user_id, amount, shipping_address, order_email, order_status } =
      req.body;

    const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    let id = req.params.id;

    try {
      con.query(
        `UPDATE orders SET user_id="${user_id}",amount="${amount}",shipping_address="${shipping_address}",order_email="${order_email}",order_date="${order_date}",order_status="${order_status}" WHERE order_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});

// Delete order

router.delete("/:id", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM orders WHERE orders.order_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});

module.exports = router;
