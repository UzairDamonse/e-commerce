const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const adminController = require("../controller/admin/index");

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
  return adminController.addOrder(req, res);
});

// Edit orders

router.put("/:id", middleware, (req, res) => {
  return adminController.editOrder(req, res);
});

// Delete order

router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteOrder(req, res);
});

module.exports = router;
