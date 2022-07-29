const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

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
  console.log(req.user);
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      stock,
    } = req.body;

    const create_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      con.query(
        `INSERT INTO products (sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock) VALUES ("${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}","${image}","${category}","${create_date}","${stock}")`,
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

// Edit user

router.put("/:id", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      stock,
    } = req.body;

    const create_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    let id = req.params.id;

    try {
      con.query(
        `UPDATE products SET sku="${sku}",name="${name}",price="${price}",weight="${weight}",descriptions="${descriptions}",thumbnail="${thumbnail}",image="${image}",category="${category}",stock="${stock}" WHERE products.product_id = "${id}"`,
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

// Delete products

router.delete("/:id", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM products WHERE products.product_id = "${id}"`,
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
