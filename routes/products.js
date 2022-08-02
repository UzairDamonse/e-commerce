const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const AuthController = require("../controller/Auth/index");
const adminController = require("../controller/admin/index");

// All products

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single products

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM products WHERE products.product_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add product

router.post("/", middleware, (req, res) => {
  return adminController.addProduct(req, res);
  //   console.log(req.user);
});

// Edit product

router.put("/:id", middleware, (req, res) => {
  return adminController.editProduct(req, res);
});

// Delete products

router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteProduct(req, res);
});

module.exports = router;
